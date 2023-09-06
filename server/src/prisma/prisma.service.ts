import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, RolesEnum } from '@prisma/client';
import * as process from 'process';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        this.initRoles()
            .catch((e) => {
                console.error(e);
                process.exit(1);
            })
            .finally(async () => {
                await this.$connect();
            });
    }

    private async initRoles() {
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
