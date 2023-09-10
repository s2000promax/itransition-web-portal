import { Review as OriginalReview, ReviewTypeEnum, User } from '@prisma/client';
import { UserResponse } from '../../interceptors';
import { Exclude } from 'class-transformer';

interface Review extends Omit<OriginalReview, 'likesCount' | 'viewCount'> {
    likesCount: string;
    viewCount: string;
    user: UserResponse;
}

export class ReviewResponse implements Review {
    id: string;
    ownerId: string;
    title: string;
    subtitle: string;
    cover: string;
    type: ReviewTypeEnum;
    createdAt: Date;
    updatedAt: Date;
    ownerRating: number;
    averageRating: number;

    likesCount: string;
    viewCount: string;

    user: UserResponse;

    @Exclude()
    owner: User;

    constructor(review: OriginalReview, user: User) {
        Object.assign(this, review);
        this.likesCount = review.likesCount.toString();
        this.viewCount = review.viewCount.toString();
        this.user = new UserResponse(user);
    }
}
