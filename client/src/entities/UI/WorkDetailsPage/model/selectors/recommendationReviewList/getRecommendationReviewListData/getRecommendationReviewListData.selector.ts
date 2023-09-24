import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRecommendationReviewListDataSelector = (state: StateSchemaI) =>
    state.workDetailsPage?.recommendationReviewList?.data;
