import { StateSchemaI } from '@/app/providers/StoreProvider';
import { ReviewSortFieldEnums } from '@/entities/UI/ReviewListPage';

export const getReviewListPageSortSelector = (state: StateSchemaI) =>
    state.reviewListPage?.sort ?? ReviewSortFieldEnums.CREATED_AT;
