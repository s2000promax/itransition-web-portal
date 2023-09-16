import { StateSchemaI } from '@/app/providers/StoreProvider';
import { SortFieldEnums } from '@/entities/UI/UI';

export const getReviewListPageSortSelector = (state: StateSchemaI) =>
    state.reviewListPage?.sort ?? SortFieldEnums.CREATED;
