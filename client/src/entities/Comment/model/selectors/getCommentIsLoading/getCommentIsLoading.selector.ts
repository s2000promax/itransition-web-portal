import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getCommentIsLoadingSelector = (state: StateSchemaI) =>
    state.comment?.isLoading;
