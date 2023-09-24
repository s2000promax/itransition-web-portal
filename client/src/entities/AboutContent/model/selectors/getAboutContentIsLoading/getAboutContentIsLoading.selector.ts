import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getAboutContentIsLoadingSelector = (state: StateSchemaI) =>
    state.aboutContent?.isLoading;
