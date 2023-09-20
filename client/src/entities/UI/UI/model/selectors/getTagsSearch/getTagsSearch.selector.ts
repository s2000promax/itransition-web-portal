import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getTagsSearchSelector = (state: StateSchemaI) =>
    state.ui?.tags ?? '';
