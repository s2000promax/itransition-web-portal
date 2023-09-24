import { combineReducers } from '@reduxjs/toolkit';
import { WorkDetailsPageSchemaI } from './model/types/workDetailsPage.interface';

export type {
    WorkDetailsPageSchemaI,
    FeedbackSchemaI,
    RecommendationReviewsSchemaI,
} from './model/types/workDetailsPage.interface';

export { getFeedbackListDataSelector } from './model/selectors/feedbackList/getFeedbackListData/getFeedbackListData.selector';
export { getFeedbackListIsLoadingSelector } from './model/selectors/feedbackList/getFeedbackListIsLoading/getFeedbackListIsLoading.selector';
export { getFeedbackListErrorSelector } from './model/selectors/feedbackList/getFeedbackListError/getFeedbackListError.selector';

export { getRecommendationReviewListDataSelector } from './model/selectors/recommendationReviewList/getRecommendationReviewListData/getRecommendationReviewListData.selector';
export { getRecommendationReviewListIsLoadingSelector } from './model/selectors/recommendationReviewList/getRecommendationReviewListIsLoading/getRecommendationReviewListIsLoading.selector';
export { getRecommendationReviewListErrorSelector } from './model/selectors/recommendationReviewList/getRecommendationReviewListError/getRecommendationReviewListError.selector';

export { fetchFeedbackListService } from './model/services/feedbackList/fetchFeedbackList/fetchFeedbackList.service';
export { fetchRecommendationReviewListService } from './model/services/recommendationReviewList/fetchRecommendationReviewList/fetchRecommendationReviewList.service';

import { feedbackListReducer } from './model/slice/feedbackList/feedbackList.slice';
import { recommendationReviewListReducer } from './model/slice/recommendationReviewList/recommendationReviewList.slice';

export const workDetailsPageReducer = combineReducers<WorkDetailsPageSchemaI>({
    feedbackList: feedbackListReducer,
    recommendationReviewList: recommendationReviewListReducer,
});
