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
        getArticleRating: build.query<RatingI[], GetRatingArg>({
            query: ({ reviewId, userId }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    reviewId,
                },
            }),
        }),
        rateArticle: build.mutation<void, RateArg>({
            query: (arg) => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const useGetRating = ratingApi.useGetArticleRatingQuery;
export const useRate = ratingApi.useRateArticleMutation;
