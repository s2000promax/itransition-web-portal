import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getDashboardUserListSelector = (state: StateSchemaI) =>
    state.dashboard?.usersList;
