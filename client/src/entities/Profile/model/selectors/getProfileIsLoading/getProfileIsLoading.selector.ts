import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getProfileIsLoading = (state: StateSchemaI) =>
    state.profile?.isLoading;
