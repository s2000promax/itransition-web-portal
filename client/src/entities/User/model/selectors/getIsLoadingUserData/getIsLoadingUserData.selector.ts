import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getIsLoadingUserDataSelector = (state: StateSchemaI) =>
    state.user.isLoading;
