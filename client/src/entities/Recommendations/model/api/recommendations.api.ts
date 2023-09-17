import { rtkApi } from '@/shared/api/rtk.api';
import { ReviewI } from '@/entities/Review';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getReviewRecommendationsList: build.query<ReviewI[], string>({
            query: (reviewId) => ({
                url: 'review/recommendation/list',
                params: {
                    _reviewId: reviewId,
                    _limit: 3,
                    _page: 1,
                },
            }),
        }),
    }),
});

export const useReviewRecommendationsList =
    recommendationsApi.useGetReviewRecommendationsListQuery;
