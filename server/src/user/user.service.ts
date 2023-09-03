import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../config/types/auth/jwtPayload';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(user: Partial<User>) {
        const hashedPassword = user.password
            ? this.hashPassword(user.password)
            : null;

        const createdUser = await this.prismaService.user.create({
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: hashedPassword,
                avatar: '',
                role: 'USER',
                settings: 0,
            },
        });

        if (!createdUser) {
            return null;
        } else {
            return createdUser;
        }
    }

    async save(user: Partial<User>) {
        const hashedPassword = user?.password
            ? this.hashPassword(user.password)
            : null;
        const savedUser = await this.prismaService.user.upsert({
            where: {
                email: user.email,
            },
            update: {
                firstName: user.firstName ?? undefined,
                lastName: user.lastName ?? undefined,
                avatar: user.avatar ?? undefined,
                password: hashedPassword ?? undefined,
                provider: user?.provider ?? undefined,
                role: user?.role ?? undefined,
                isBlocked: user?.isBlocked ?? undefined,
            },
            create: {
                firstName: user.firstName ?? undefined,
                lastName: user.lastName ?? undefined,
                avatar: user.avatar ?? undefined,
                email: user.email,
                password: hashedPassword,
                provider: user?.provider,
                role: user.role ?? undefined,
                isBlocked: user?.isBlocked ?? undefined,
            },
        });

        return savedUser;
    }

    async findById(id: string): Promise<User> {
        const foundedUser = await this.prismaService.user.findFirst({
            where: {
                id: id,
            },
        });

        if (!foundedUser) {
            return null;
        } else {
            return foundedUser;
        }
    }

    async findByEmail(email: string): Promise<User> {
        const foundedUser = await this.prismaService.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!foundedUser) {
            return null;
        } else {
            return foundedUser;
        }
    }

    async findAll(): Promise<Array<User>> {
        const users = await this.prismaService.user.findMany();
        if (!users) {
            return null;
        } else {
            return users;
        }
    }

    async delete(id: string, user: JwtPayload) {
        if (user.id !== id) {
            throw new ForbiddenException();
        }

        return this.prismaService.user.delete({
            where: { id },
            select: { id: true },
        });
    }

    async updateIsBlockedStatus(ids: string[], status: boolean) {
        if (Array.isArray(ids) && typeof status !== undefined) {
            const updateResponse = await this.prismaService.user.updateMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
                data: {
                    isBlocked: status,
                },
            });
            if (!!updateResponse) {
                return JSON.stringify(
                    `Success. Updated ${updateResponse.count} users`,
                );
            }
        }

        return JSON.stringify('Failed to update');
    }

    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10));
    }
}
