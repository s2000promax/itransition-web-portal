import { TransformUserI, UserResponse } from '../../libs/transformers';
import { Exclude } from 'class-transformer';
import { User, UsersRating } from '@prisma/client';

export class FeedbackListResponse implements UsersRating {
    feedback: string;
    createdAt: Date;
    workId: string;
    rate: number;

    @Exclude()
    userId: string;

    user: TransformUserI;

    constructor(userRating: UsersRating, user: User) {
        Object.assign(this, userRating);
        this.user = new UserResponse(user);
    }
}
