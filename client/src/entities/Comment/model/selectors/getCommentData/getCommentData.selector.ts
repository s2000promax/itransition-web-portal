import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getCommentDataSelector = (state: StateSchemaI) =>
    state.comment?.data;
