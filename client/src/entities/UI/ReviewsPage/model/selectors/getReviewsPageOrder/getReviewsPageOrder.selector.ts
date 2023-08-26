import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewsPageOrderSelector = (state: StateSchemaI) =>
    state.reviewsPage?.order ?? 'asc';
