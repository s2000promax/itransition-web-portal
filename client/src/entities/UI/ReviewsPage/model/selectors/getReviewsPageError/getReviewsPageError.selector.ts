import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewsPageErrorSelector = (state: StateSchemaI) =>
    state.reviewsPage?.error;
