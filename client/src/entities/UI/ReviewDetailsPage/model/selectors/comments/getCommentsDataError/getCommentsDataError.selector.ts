import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getCommentsDataErrorSelector = (state: StateSchemaI) => {
    return state.reviewDetailsPage?.comments?.error;
};
