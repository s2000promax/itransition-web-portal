import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewListPageInitedSelector = (state: StateSchemaI) =>
    state.reviewListPage?._inited;
