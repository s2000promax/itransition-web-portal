export type { CommentFormSchemaI } from './model/types/commentForm.interface';

export { getCommentFormText } from './model/selectors/getCommentFormText/getAddCommentFormText.selector';
export { getCommentFormError } from './model/selectors/getCommentFormError/getCommentFormError.selector';

export {
    commentFormReducer,
    commentFormActions,
} from './model/slices/commentForm.slice';
