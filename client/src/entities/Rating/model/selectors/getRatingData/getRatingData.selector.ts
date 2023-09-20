import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getRatingDataSelector = (state: StateSchemaI) =>
    state.rating?.data;
