import { User, User as OriginalUser } from '@prisma/client';
import { Exclude } from 'class-transformer';

export interface TransformUserI extends Omit<OriginalUser, 'likesCounter'> {
    likesCounter: string;
}

export class UserResponse implements TransformUserI {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    likesCounter: string;

    @Exclude()
    email: string;

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
        this.likesCounter = user.likesCounter.toString();
    }
}
