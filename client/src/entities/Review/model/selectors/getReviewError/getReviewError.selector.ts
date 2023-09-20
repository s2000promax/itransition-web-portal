import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewErrorSelector = (state: StateSchemaI) =>
    state.review?.error;
