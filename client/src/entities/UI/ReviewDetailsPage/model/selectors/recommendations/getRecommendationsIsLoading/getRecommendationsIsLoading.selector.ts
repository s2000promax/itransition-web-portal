import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRecommendationsIsLoadingSelector = (state: StateSchemaI) => {
    return state.reviewDetailsPage?.recommendations?.isLoading;
};
