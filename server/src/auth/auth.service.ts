import {
    ConflictException,
    HttpException, HttpStatus,
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
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const user: User = await this.userService
            .findByEmail(dto.email)
            .catch(() => {
                return null;
            });

        if (user) {
            throw new ConflictException(
                'User with the same email is already registered',
            );
        }

        return this.userService.create(dto).catch(() => {
            return null;
        });
    }

    async login(dto: LoginDto): Promise<TokensInterface> {
        const user: User = await this.userService
            .findByEmail(dto.email)
            .catch(() => {
                return null;
            });

        if (!user || !compareSync(dto.password, user.password)) {
            throw new UnauthorizedException('Wrong login or password');
        }

        return this.generateTokens(user);
    }

    async refreshTokens(refreshToken: string): Promise<TokensInterface> {
        const token = await this.prismaService.token
            .delete({
                where: { token: refreshToken },
            })
            .catch(() => {
                throw new HttpException('Invalid Token', 498);
            });

        if (!token || new Date(token.expired) < new Date()) {
            throw new UnauthorizedException();
        }
        const user = await this.userService.findById(token.userId);
        return this.generateTokens(user);
    }

    private async generateTokens(user: User): Promise<TokensInterface> {
        const jwtPayload: JwtPayload = {
            id: user.id,
            email: user.email,
        };
        const accessToken = 'Bearer ' + this.jwtService.sign(jwtPayload);

        const refreshToken = await this.getRefreshToken(user.id);

        return {
            accessToken,
            refreshToken,
        };
    }

    private async getRefreshToken(userId: string): Promise<Token> {
        const _token = await this.prismaService.token.findFirst({
            where: {
                userId,
            },
        });

        const token = _token?.token ?? '';

        return this.prismaService.token.upsert({
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
    }

    deleteRefreshToken(token: string) {
        return this.prismaService.token.delete({
            where: {
                token,
            },
        });
    }

    async providerAuth(email: string, provider: ProvidersEnums) {
        const userExists = await this.userService.findByEmail(email);
        if (userExists) {
            const user = await this.userService
                .save({ email, provider })
                .catch((err) => {
                    return null;
                });
            return this.generateTokens(user);
        }
        const user = await this.userService
            .save({ email, provider })
            .catch((err) => {
                return null;
            });
        if (!user) {
            throw new HttpException(
                `Failed to create user with email: ${email} in ${provider} Auth`,
                HttpStatus.BAD_REQUEST,
            );
        }
        return this.generateTokens(user);
    }
}
