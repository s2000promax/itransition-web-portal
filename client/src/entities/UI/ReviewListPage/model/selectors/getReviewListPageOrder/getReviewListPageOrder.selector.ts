import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewListPageOrderSelector = (state: StateSchemaI) =>
    state.reviewListPage?.order ?? 'asc';
