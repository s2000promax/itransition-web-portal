import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getTagListSelector = (state: StateSchemaI) => state.tag?.tagList;
