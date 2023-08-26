import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewDataSelector = (state: StateSchemaI) =>
    state.review?.data;
