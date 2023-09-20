import { StateSchemaI } from '@/app/providers/StoreProvider';
import { WorkSortFieldEnums } from '@/entities/UI/WorkListPage';

export const getWorkListPageSortSelector = (state: StateSchemaI) =>
    state.workListPage?.sort ?? WorkSortFieldEnums.RELEASE_DATE;
