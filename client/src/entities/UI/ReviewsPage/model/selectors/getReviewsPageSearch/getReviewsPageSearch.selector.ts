import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewsPageSearchSelector = (state: StateSchemaI) =>
    state.reviewsPage?.search ?? '';
