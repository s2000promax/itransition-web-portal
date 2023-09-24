import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRecommendationReviewListIsLoadingSelector = (
    state: StateSchemaI,
) => state.workDetailsPage?.recommendationReviewList?.isLoading;
