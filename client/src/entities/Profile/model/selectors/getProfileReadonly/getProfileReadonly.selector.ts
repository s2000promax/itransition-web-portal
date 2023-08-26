import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getProfileReadonly = (state: StateSchemaI) =>
    state.profile?.readonly;
