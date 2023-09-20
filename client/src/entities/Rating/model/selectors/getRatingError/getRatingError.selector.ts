import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRatingErrorSelector = (state: StateSchemaI) =>
    state.rating?.error;
