import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewDataLoadingSelector = (state: StateSchemaI) =>
    state.review?.isLoading || false;
