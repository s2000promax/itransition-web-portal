import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getTagCurrentDataSelector = (state: StateSchemaI) =>
    state.tag?.data;
