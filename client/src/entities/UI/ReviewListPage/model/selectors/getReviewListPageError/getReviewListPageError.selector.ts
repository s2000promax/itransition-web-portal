import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewListPageErrorSelector = (state: StateSchemaI) =>
    state.reviewListPage?.error;
