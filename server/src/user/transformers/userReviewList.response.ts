import { Exclude } from 'class-transformer';
import { Review, ReviewTypeEnum } from '@prisma/client';

export class UserReviewListResponse implements Omit<Review, 'viewCounter'> {
    id: string;
    title: string;
    workId: string;
    workTitle: string;
    cover: string;
    createdAt: Date;
    updatedAt: Date;
    ownerRating: number;
    type: ReviewTypeEnum;

    viewCounter: string;

    @Exclude()
    ownerId: string;

    constructor(review: Review) {
        Object.assign(this, review);
        this.viewCounter = String(review.viewCounter);
    }
}
