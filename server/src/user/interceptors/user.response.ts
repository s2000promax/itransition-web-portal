import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;

    @Exclude()
    password: string;

    avatar: string;
    settings: number;
    isBlocked: boolean;
    role: string;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    provider: string;

    constructor(user: User) {
        Object.assign(this, user);
    }
}
