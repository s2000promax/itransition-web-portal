import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewListPageNumberSelector = (state: StateSchemaI) =>
    state.reviewListPage?.page || 1;
