import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getAboutContentErrorSelector = (state: StateSchemaI) =>
    state.aboutContent?.error;
