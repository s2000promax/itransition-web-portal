import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewIsLoadingSelector = (state: StateSchemaI) =>
    state.review?.isLoading || false;
