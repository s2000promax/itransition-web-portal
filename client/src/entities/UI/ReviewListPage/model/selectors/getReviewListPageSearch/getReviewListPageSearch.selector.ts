import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewListPageSearchSelector = (state: StateSchemaI) =>
    state.reviewListPage?.search ?? '';
