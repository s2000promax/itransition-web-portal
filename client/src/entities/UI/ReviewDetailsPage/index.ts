import { combineReducers } from '@reduxjs/toolkit';
import { ReviewDetailsPageSchemaI } from './model/types/reviewDetailsPage.interface';

export type {
    ReviewDetailsPageSchemaI,
    CommentsSchemaI,
    RecommendationsReviewsSchemaI,
} from './model/types/reviewDetailsPage.interface';

export { getCanEditReviewSelector } from './model/selectors/review/getCanEditReview/getCanEditReview.selector';

export { getCommentsIsLoadingSelector } from './model/selectors/comments/getCommentsIsLoading/getCommentsIsLoading.selector';
export { getCommentsDataErrorSelector } from './model/selectors/comments/getCommentsDataError/getCommentsDataError.selector';

export { getRecommendationsIsLoadingSelector } from './model/selectors/recommendations/getRecommendationsIsLoading/getRecommendationsIsLoading.selector';
export { getRecommendationsDataErrorSelector } from './model/selectors/recommendations/getRecommendationsDataError/getRecommendationsDataError.selector';

export { getReviewComments } from './model/slice/comments/reviewComments.slice';

export { addCommentForReviewService } from './model/services/comments/addCommentForReview/addCommentForReview.service';
export { fetchCommentsByReviewIdService } from './model/services/comments/fetchCommentsByReviewId/fetchCommentsByReviewId.service';

export { fetchRecommendationsService } from './model/services/recommendations/fetchRecommendations/fetchRecommendations.service';

import { reviewCommentsReducer } from './model/slice/comments/reviewComments.slice';
import { recommendationsReducer } from './model/slice/recommendations/recommendations.slice';

export const reviewDetailsPageReducer =
    combineReducers<ReviewDetailsPageSchemaI>({
        recommendations: recommendationsReducer,
        comments: reviewCommentsReducer,
    });
