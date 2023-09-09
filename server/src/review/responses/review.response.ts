import { Review, ReviewTypeEnum } from '@prisma/client';

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
    likesCount: bigint;
    viewCount: bigint;

    constructor(review: Review) {
        Object.assign(this, review);
    }
}
