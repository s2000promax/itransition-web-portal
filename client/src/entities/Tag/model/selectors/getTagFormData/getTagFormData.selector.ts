import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getTagFormDataSelector = (state: StateSchemaI) =>
    state.tag?.formData;
