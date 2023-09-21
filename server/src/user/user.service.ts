import { ForbiddenException, Injectable } from '@nestjs/common';
import { RolesEnum, Settings, User, UserRole } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../config/types/auth/jwtPayload';
import { TransformUserI } from './transformers';
import { ExtendUserI } from './types/extendUser.interface';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(user: Partial<User>) {
        const hashedPassword = user.password
            ? this.hashPassword(user.password)
            : null;

        try {
            const existingRoleUSER = await this.getExistingRole(RolesEnum.USER);

            const createdUser = await this.prismaService.user.create({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: hashedPassword,
                    avatar: '',
                    roles: {
                        create: [
                            {
                                roleId: existingRoleUSER.id,
                            },
                        ],
                    },
                },
            });
            return createdUser;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async save(user: Partial<User>) {
        const hashedPassword = user?.password
            ? this.hashPassword(user.password)
            : null;

        try {
            const savedUser = await this.prismaService.user.upsert({
                where: {
                    email: user.email,
                },
                update: {
                    firstName: user.firstName ?? undefined,
                    lastName: user.lastName ?? undefined,
                    avatar: user.avatar ?? undefined,
                    password: hashedPassword ?? undefined,
                },
                create: {
                    firstName: user.firstName ?? '',
                    lastName: user.lastName ?? '',
                    avatar: user.avatar ?? '',
                    email: user.email,
                    password: hashedPassword,
                    provider: user.provider,
                    isBlocked: user.isBlocked ?? false,
                },
            });

            return savedUser;
        } catch (e) {
            console.log(e);
        }
    }

    async delete(userId: string) {
        try {
            await this.prismaService.user.delete({
                where: { id: userId },
                select: { id: true },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async findById(userId: string): Promise<User> {
        try {
            const foundedUser = (await this.prismaService.user.findFirst({
                where: {
                    id: userId,
                },
                include: {
                    roles: {
                        include: {
                            role: true,
                        },
                    },
                    settings: true,
                },
            })) as ExtendUserI;

            return foundedUser;
        } catch (e) {
            console.log(e);
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            const foundedUser = await this.prismaService.user.findFirst({
                where: {
                    email: email,
                },
            });

            return foundedUser;
        } catch (e) {
            console.log(e);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const foundedUsers = await this.prismaService.user.findMany();

            return foundedUsers;
        } catch (e) {
            console.log(e);
        }
    }

    async getUserRoles(userId: string): Promise<RolesEnum[]> {
        try {
            const userRoles = await this.prismaService.userRole.findMany({
                where: { userId },
                include: { role: true },
            });

            return userRoles.map((userRole) => userRole.role.name);
        } catch (e) {
            console.log(e);
        }
    }

    async updateUserSettings(userId: string, body: Settings) {
        const { theme, language, isFirstVisit, isReviewsPageWasOpened } = body;

        try {
            await this.prismaService.settings.upsert({
                where: { userId },
                update: {
                    theme,
                    language,
                    isFirstVisit,
                    isReviewsPageWasOpened,
                },
                create: {
                    userId,
                    theme,
                    language,
                    isFirstVisit,
                    isReviewsPageWasOpened,
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async addRoleToUser(userId: string, role: RolesEnum) {
        try {
            const existingRole = await this.getExistingRole(role);

            await this.prismaService.userRole.create({
                data: {
                    userId: userId,
                    roleId: existingRole.id,
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async removeRoleFromUser(userId: string, role: RolesEnum) {
        try {
            const existingRole = await this.getExistingRole(role);

            await this.prismaService.userRole.delete({
                where: {
                    userId_roleId: {
                        userId: userId,
                        roleId: existingRole.id,
                    },
                },
            });
        } catch (e) {
            console.log(e);
        }
    }

    async isRoleAlreadyIncluded(userId: string, role: RolesEnum) {
        try {
            const userRoles = await this.prismaService.userRole.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    role: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            const roleNames = userRoles.map((userRole) => userRole.role.name);

            if (roleNames.includes(role)) {
                return true;
            }

            return false;
        } catch (e) {
            console.log(e);
        }
    }

    private async getExistingRole(role: RolesEnum) {
        try {
            const existingRole = await this.prismaService.role.findFirst({
                where: {
                    name: role,
                },
            });

            return existingRole;
        } catch (e) {
            console.log(e);
        }
    }

    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10));
    }
}
