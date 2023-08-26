import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewsPageNumberSelector = (state: StateSchemaI) =>
    state.reviewsPage?.page || 1;
