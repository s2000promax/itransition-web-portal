import { Type } from 'class-transformer';
import { ReviewResponse } from './review.response';

export class ReviewResponseList {
    @Type(() => ReviewResponse)
    reviews: ReviewResponse[];

    constructor(reviews: ReviewResponse[]) {
        this.reviews = reviews;
    }
}
