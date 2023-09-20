import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getTagListErrorSelector = (state: StateSchemaI) =>
    state.tag?.error;
