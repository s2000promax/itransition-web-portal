import { Review, ReviewTypeEnum } from '@prisma/client';
import { Exclude } from 'class-transformer';

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
    likesCount: number;
    viewCount: number;

    constructor(review: Review) {
        Object.assign(this, review);
    }
}
