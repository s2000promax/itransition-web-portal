import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getReviewListPageHasMoreSelector } from '../../selectors/getReviewListPageHasMore/getReviewListPageHasMore.selector';
import { getReviewListPageNumberSelector } from '../../selectors/getReviewListPageNumber/getReviewListPageNumber.selector';
import { getReviewListPageIsLoadingSelector } from '../../selectors/getReviewListPageIsLoading/getReviewListPageIsLoading.selector';
import { fetchReviewListService } from '../fetchReviewList/fetchReviewListService';
import { reviewListPageActions } from '../../slices/reviewListPage.slice';

export const fetchNextReviewListPageService = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('reviewListPage/fetchNextReviewListPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getReviewListPageHasMoreSelector(getState());
    const page = getReviewListPageNumberSelector(getState());
    const isLoading = getReviewListPageIsLoadingSelector(getState());

    if (hasMore && !isLoading) {
        dispatch(reviewListPageActions.setPage(page + 1));
        dispatch(fetchReviewListService({}));
    }
});
