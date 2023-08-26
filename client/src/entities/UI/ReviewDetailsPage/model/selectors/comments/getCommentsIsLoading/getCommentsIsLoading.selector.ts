import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getCommentsIsLoadingSelector = (state: StateSchemaI) => {
    return state.reviewDetailsPage?.comments?.isLoading;
};
