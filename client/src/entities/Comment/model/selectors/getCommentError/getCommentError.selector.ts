import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getCommentErrorSelector = (state: StateSchemaI) =>
    state.comment?.error;
