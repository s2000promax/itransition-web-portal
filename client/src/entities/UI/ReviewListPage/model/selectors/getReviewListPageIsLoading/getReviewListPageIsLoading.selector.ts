import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewListPageIsLoadingSelector = (state: StateSchemaI) =>
    state.reviewListPage?.isLoading || false;
