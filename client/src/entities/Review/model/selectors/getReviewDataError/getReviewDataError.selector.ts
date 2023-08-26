import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewDataErrorSelector = (state: StateSchemaI) =>
    state.review?.error;
