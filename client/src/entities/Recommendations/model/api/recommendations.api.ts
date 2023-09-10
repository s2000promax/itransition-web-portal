import { rtkApi } from '@/shared/api/rtk.api';
import { ReviewI } from '@/entities/Review';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getReviewRecommendationsList: build.query<ReviewI[], number>({
            query: (limit) => ({
                url: 'review/reviewList',
                params: {
                    _limit: limit,
                    _expand: 'user',
                    _page: 1,
                },
            }),
        }),
    }),
});

export const useReviewRecommendationsList =
    recommendationsApi.useGetReviewRecommendationsListQuery;
