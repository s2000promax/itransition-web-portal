import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewListPageSearchTagsSelector = (state: StateSchemaI) =>
    state.reviewListPage?.tags ?? '';
