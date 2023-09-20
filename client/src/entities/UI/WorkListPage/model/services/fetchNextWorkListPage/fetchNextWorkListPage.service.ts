import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getWorkListPageHasMoreSelector } from '../../selectors/getWorkListPageHasMore/getWorkListPageHasMore.selector';
import { getWorkListPageNumberSelector } from '../../selectors/getWorkListPageNumber/getWorkListPageNumber.selector';
import { getWorkListPageIsLoadingSelector } from '../../selectors/getWorkListPageIsLoading/getWorkListPageIsLoading.selector';
import { fetchWorkListPageService } from '../fetchWorkListPage/fetchWorkListPageService';
import { workListPageActions } from '../../slices/workListPage.slice';

export const fetchNextWorkListPageService = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('workListPage/fetchNextWorkListPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getWorkListPageHasMoreSelector(getState());
    const page = getWorkListPageNumberSelector(getState());
    const isLoading = getWorkListPageIsLoadingSelector(getState());

    if (hasMore && !isLoading) {
        dispatch(workListPageActions.setPage(page + 1));
        dispatch(fetchWorkListPageService({}));
    }
});
