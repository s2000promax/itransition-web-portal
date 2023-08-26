import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewsPageHasMoreSelector = (state: StateSchemaI) =>
    state.reviewsPage?.hasMore;
