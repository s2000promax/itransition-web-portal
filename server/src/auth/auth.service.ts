import {
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { Token, User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { JwtService } from '@nestjs/jwt';

import { LoginDto, RegisterDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { TokensInterface } from '../config/types/auth/tokens.interface';
import { JwtPayload } from '../config/types/auth/jwtPayload';
import { ProvidersEnums } from '../config/enums/providers.enums';

@Injectable()
export class AuthService {
    private tempData: any;
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        try {
            const user = await this.userService.findByEmail(dto.email);

            if (user) {
                throw new ConflictException(
                    'User with the same email is already registered',
                );
            }

            await this.userService.create(dto);
        } catch (e) {
            console.log(e);
        }
    }

    async login(dto: LoginDto): Promise<TokensInterface> {
        try {
            const user = await this.userService.findByEmail(dto.email);

            if (!user || !compareSync(dto.password, user.password)) {
                throw new UnauthorizedException('Wrong login or password');
            }

            return await this.generateTokens(user.id, user.email);
        } catch (e) {
            console.log(e);
        }
    }

    async refreshTokens(refreshToken: string): Promise<TokensInterface> {
        try {
            const token = await this.prismaService.token.delete({
                where: { token: refreshToken },
            });

            if (!token || new Date(token.expired) < new Date()) {
                throw new UnauthorizedException();
            }

            const user = await this.userService.findById(token.userId);

            return await this.generateTokens(user.id, user.email);
        } catch (e) {
            console.log(e);
            throw new HttpException('Invalid Token', 498);
        }
    }

    private async generateTokens(
        userId: string,
        userEmail: string,
    ): Promise<TokensInterface> {
        const jwtPayload: JwtPayload = {
            id: userId,
            email: userEmail,
        };
        const accessToken = 'Bearer ' + this.jwtService.sign(jwtPayload);

        const refreshToken = await this.getRefreshToken(userId);

        return {
            accessToken,
            refreshToken,
        };
    }

    private async getRefreshToken(userId: string): Promise<Token> {
        try {
            const _token = await this.prismaService.token.findFirst({
                where: {
                    userId,
                },
            });

            const token = _token?.token ?? '';

            return await this.prismaService.token.upsert({
                where: { token },
                update: {
                    token: v4(),
                    expired: add(new Date(), { months: 1 }),
                },
                create: {
                    token: v4(),
                    expired: add(new Date(), { months: 1 }),
                    userId,
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async deleteRefreshToken(token: string) {
        try {
            return await this.prismaService.token.delete({
                where: {
                    token,
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async providerAuth(email: string, provider: ProvidersEnums) {
        try {
            const userExists = await this.userService.findByEmail(email);
            if (userExists) {
                const user: User = await this.userService.save({
                    email,
                    provider,
                });

                return await this.generateTokens(user.id, user.email);
            }
            const user: User = await this.userService.save({ email, provider });

            if (!user) {
                throw new HttpException(
                    `Failed to create user with email: ${email} in ${provider} Auth`,
                    HttpStatus.BAD_REQUEST,
                );
            }

            return await this.generateTokens(user.id, user.email);
        } catch (e) {
            console.log(e);
        }
    }

    saveData(data: any) {
        this.tempData = data;
    }

    getData() {
        return this.tempData;
    }
}
