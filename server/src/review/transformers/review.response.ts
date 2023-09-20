import {
    Review as OriginalReview,
    ReviewTag,
    ReviewTypeEnum,
    User,
} from '@prisma/client';
import { TransformUserI, UserResponse } from '../../libs/transformers';
import { Exclude } from 'class-transformer';

interface Review extends Omit<OriginalReview, 'viewCounter'> {
    viewCounter: string;
    user: UserResponse;
}

export class ReviewResponse implements Review {
    id: string;
    workId: string;
    ownerId: string;
    title: string;
    workTitle: string;
    cover: string;
    type: ReviewTypeEnum;
    createdAt: Date;
    updatedAt: Date;
    ownerRating: number;
    viewCounter: string;

    user: UserResponse;
    tags: string[];

    @Exclude()
    owner: User;

    constructor(review: OriginalReview, user: User, tags?: ReviewTag[]) {
        Object.assign(this, review);
        this.viewCounter = review.viewCounter.toString();
        this.user = new UserResponse(user);
        this.tags = tags?.map((tag) => tag.tagId) || [];
    }
}
