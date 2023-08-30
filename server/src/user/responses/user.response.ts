import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    settings: number;
    isBlocked: boolean;
    roles: string;
    provider: string;

    @Exclude()
    password: string;

    constructor(user: User) {
        Object.assign(this, user);
    }
}
