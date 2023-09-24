import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getAboutContentSelector = (state: StateSchemaI) =>
    state.aboutContent?.content;
