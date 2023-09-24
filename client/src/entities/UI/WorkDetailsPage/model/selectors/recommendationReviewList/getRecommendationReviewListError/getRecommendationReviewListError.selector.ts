import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRecommendationReviewListErrorSelector = (state: StateSchemaI) =>
    state.workDetailsPage?.recommendationReviewList?.error;
