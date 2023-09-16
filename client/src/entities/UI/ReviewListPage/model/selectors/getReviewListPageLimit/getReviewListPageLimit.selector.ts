import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewListPageLimitSelector = (state: StateSchemaI) =>
    state.reviewListPage?.limit || 9;
