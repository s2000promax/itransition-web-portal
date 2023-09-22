import { RolesEnum, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ExtendUserI } from '../../config/types/user/extendUser.interface';
import { RoleRelationI } from '../../user/types/roleRelationI.interface';

export class UserResponse implements Omit<ExtendUserI, 'settings' | 'roles'> {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    isBlocked: boolean;
    provider: string;
    roles: RolesEnum[];

    @Exclude()
    password: string;

    @Exclude()
    likesCounter: bigint;

    constructor(user: Partial<ExtendUserI>, userRoles: RoleRelationI[]) {
        Object.assign(this, user);
        this.roles = userRoles.map((role) => role.role.name);
    }
}
