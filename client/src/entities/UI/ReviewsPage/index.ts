export type { ReviewsPageSchemaI } from './model/types/reviewsPage.interface';

export { getReviewsPageErrorSelector } from './model/selectors/getReviewsPageError/getReviewsPageError.selector';
export { getReviewsPageHasMoreSelector } from './model/selectors/getReviewsPageHasMore/getReviewsPageHasMore.selector';
export { getReviewsPageInitedSelector } from './model/selectors/getReviewsPageInited/getReviewsPageInited.selector';
export { getReviewsPageIsLoadingSelector } from './model/selectors/getReviewsPageIsLoading/getReviewsPageIsLoading.selector';
export { getReviewsPageLimitSelector } from './model/selectors/getReviewsPageLimit/getReviewsPageLimit.selector';
export { getReviewsPageNumberSelector } from './model/selectors/getReviewsPageNum/getReviewsPageNumber.selector';
export { getReviewsPageOrderSelector } from './model/selectors/getReviewsPageOrder/getReviewsPageOrder.selector';
export { getReviewsPageSearchSelector } from './model/selectors/getReviewsPageSearch/getReviewsPageSearch.selector';
export { getReviewsPageSortSelector } from './model/selectors/getReviewsPageSort/getReviewsPageSort.selector';
export { getReviewsPageTypeSelector } from './model/selectors/getReviewsPageType/getReviewsPageType.selector';
export { getReviewsPageViewSelector } from './model/selectors/getReviewsPageView/getReviewsPageView.selector';
export { useReviewItemByIdSelector } from './model/selectors/useReviewItemById/useReviewItemById.selector';

export {
    reviewsPageReducer,
    reviewsPageActions,
    getReviews,
} from './model/slices/reviewsPage.slice';

export { initReviewsPageService } from './model/services/initReviewsPage/initReviewsPage.service';
export { fetchReviewListService } from './model/services/fetchReviewsList/fetchReviewListService';
export { fetchNextReviewsPageService } from './model/services/fetchNextReviewsPage/fetchNextReviewsPage.service';
