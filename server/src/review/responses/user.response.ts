import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
    id: string;
    firstName: string;
    lastName: string;

    @Exclude()
    email: string;

    avatar: string;

    @Exclude()
    settings: number;

    @Exclude()
    isBlocked: boolean;

    @Exclude()
    role: string;

    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

    @Exclude()
    provider: string;

    @Exclude()
    password: string;

    constructor(user: User) {
        Object.assign(this, user);
    }
}
