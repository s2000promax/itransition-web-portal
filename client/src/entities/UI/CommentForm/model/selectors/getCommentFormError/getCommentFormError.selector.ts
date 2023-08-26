import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getCommentFormError = (state: StateSchemaI) =>
    state.commentForm?.error;
