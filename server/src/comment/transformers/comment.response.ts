import { Comment, User } from '@prisma/client';
import { UserResponse } from '../../libs/transformers';
import { Exclude } from 'class-transformer';

export class CommentResponse implements Comment {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;

    @Exclude()
    reviewId: string;

    user: UserResponse;

    constructor(comment: Comment, user: User) {
        Object.assign(this, comment);
        this.user = new UserResponse(user);
    }
}
