import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, RolesEnum } from '@prisma/client';
import * as process from 'process';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        this.initRoles()
            .catch((e) => {
                console.error('Prisma initial failure', e);
                process.exit(1);
            })
            .finally(async () => {
                await this.$connect()
                    .then(() => {
                        console.log('Prisma DB connect successful');
                    })
                    .catch((e) => {
                        console.log('Prisma DB connect failure', e);
                    });
            });
    }

    private async initRoles() {
        if (process.env.VERCEL_NODE_ENV !== 'production') {
            const prisma = new PrismaClient();
            const roles = [RolesEnum.SA, RolesEnum.ADMIN, RolesEnum.USER];

            for (let role of roles) {
                const existingRole = await prisma.role.findFirst({
                    where: { name: role },
                });

                if (!existingRole) {
                    await prisma.role.create({ data: { name: role } });
                }
            }
        }
    }
}
