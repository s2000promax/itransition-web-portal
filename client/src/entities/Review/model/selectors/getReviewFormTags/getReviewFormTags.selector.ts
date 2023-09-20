import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewFormTagsSelector = (state: StateSchemaI) =>
    state.review?.form?.tags;
