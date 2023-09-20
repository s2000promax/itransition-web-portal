import { RolesEnum } from '@prisma/client';

export interface RoleRelationI {
    roleId: string;
    userId: string;
    role: {
        id: string;
        name: RolesEnum;
    };
}
