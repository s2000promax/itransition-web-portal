export type { CommentI, CommentSchemaI } from './model/types/comment.interface';

export { getCommentDataSelector } from './model/selectors/getCommentData/getCommentData.selector';
export { getCommentIsLoadingSelector } from './model/selectors/getCommentIsLoading/getCommentIsLoading.selector';
export { getCommentErrorSelector } from './model/selectors/getCommentError/getCommentError.selector';

export { commentReducer, commentActions } from './model/slices/comment.slice';

export { addCommentService } from './model/services/addComment/addComment.service';
export { fetchCommentListService } from './model/services/fetchCommentList/fetchCommentList.service';
