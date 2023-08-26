import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewsPageLimitSelector = (state: StateSchemaI) =>
    state.reviewsPage?.limit || 9;
