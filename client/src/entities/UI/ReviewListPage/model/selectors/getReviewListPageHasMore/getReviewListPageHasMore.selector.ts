import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewListPageHasMoreSelector = (state: StateSchemaI) =>
    state.reviewListPage?.hasMore;
