import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewsPageIsLoadingSelector = (state: StateSchemaI) =>
    state.reviewsPage?.isLoading || false;
