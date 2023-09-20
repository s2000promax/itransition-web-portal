import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewFormBlocksSelector = (state: StateSchemaI) =>
    state.review?.form?.blocks;
