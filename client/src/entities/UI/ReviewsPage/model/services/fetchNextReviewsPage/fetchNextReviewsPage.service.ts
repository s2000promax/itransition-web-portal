import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getReviewsPageHasMoreSelector } from '../../selectors/getReviewsPageHasMore/getReviewsPageHasMore.selector';
import { getReviewsPageNumberSelector } from '../../selectors/getReviewsPageNum/getReviewsPageNumber.selector';
import { getReviewsPageIsLoadingSelector } from '../../selectors/getReviewsPageIsLoading/getReviewsPageIsLoading.selector';
import { fetchReviewListService } from '@/entities/UI/ReviewsPage/model/services/fetchReviewsList/fetchReviewListService';
import { reviewsPageActions } from '@/entities/UI/ReviewsPage/model/slices/reviewsPage.slice';

export const fetchNextReviewsPageService = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('reviewsPage/fetchNextReviewsPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getReviewsPageHasMoreSelector(getState());
    const page = getReviewsPageNumberSelector(getState());
    const isLoading = getReviewsPageIsLoadingSelector(getState());

    if (hasMore && !isLoading) {
        dispatch(reviewsPageActions.setPage(page + 1));
        dispatch(fetchReviewListService({}));
    }
});
