import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewReadonlySelector = (state: StateSchemaI) =>
    state.review?.readonly;
