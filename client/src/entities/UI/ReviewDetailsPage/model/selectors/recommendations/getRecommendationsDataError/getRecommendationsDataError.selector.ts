import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRecommendationsDataErrorSelector = (state: StateSchemaI) => {
    return state.reviewDetailsPage?.recommendations?.error;
};
