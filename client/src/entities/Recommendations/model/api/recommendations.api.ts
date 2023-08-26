import { rtkApi } from '@/shared/api/rtk.api';
import { ReviewI } from '@/entities/Review';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getReviewRecommendationsList: build.query<ReviewI[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                    _expand: 'user',
                },
            }),
        }),
    }),
});

export const useReviewRecommendationsList =
    recommendationsApi.useGetReviewRecommendationsListQuery;
