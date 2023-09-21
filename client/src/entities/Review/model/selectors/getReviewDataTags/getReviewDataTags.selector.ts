import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewDataTagsSelector = (state: StateSchemaI) =>
    state.review?.data?.tags;
