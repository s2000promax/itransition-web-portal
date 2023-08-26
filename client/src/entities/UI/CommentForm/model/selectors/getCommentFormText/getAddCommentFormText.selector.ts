import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getCommentFormText = (state: StateSchemaI) =>
    state.commentForm?.text ?? '';
