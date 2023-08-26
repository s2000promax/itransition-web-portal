import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getReviewsPageInitedSelector = (state: StateSchemaI) =>
    state.reviewsPage?._inited;
