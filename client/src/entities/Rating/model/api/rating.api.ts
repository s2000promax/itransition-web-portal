import { rtkApi } from '@/shared/api/rtk.api';
import { RatingI } from '../types/rating.interface';

interface GetRatingArg {
    userId: string;
    reviewId: string;
}

interface RateArg {
    userId: string;
    reviewId: string;
    rate: number;
    feedback?: string;
}

const ratingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getReviewRating: build.query<RatingI[], GetRatingArg>({
            query: ({ reviewId, userId }) => ({
                url: 'rate/reviewRate',
                params: {
                    userId,
                    reviewId,
                },
            }),
        }),
        rateReview: build.mutation<void, RateArg>({
            query: (arg) => ({
                url: 'rate',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const useGetRating = ratingApi.useGetReviewRatingQuery;
export const useRate = ratingApi.useRateReviewMutation;
