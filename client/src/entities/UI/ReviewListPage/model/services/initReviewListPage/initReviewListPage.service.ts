import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrderT } from '@/shared/types/sort.type';
import { WorkTypeEnums } from '@/entities/Work';
import { getReviewListPageInitedSelector } from '../../selectors/getReviewListPageInited/getReviewListPageInited.selector';
import { reviewListPageActions } from '../../slices/reviewListPage.slice';
import { fetchReviewListService } from '../../services/fetchReviewList/fetchReviewListService';
import { SortFieldEnums } from '@/entities/UI/UI';

export const initReviewListPageService = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('reviewListPage/initReviewListPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getReviewListPageInitedSelector(getState());

    if (!inited) {
        const orderFromUrl = searchParams.get('order') as SortOrderT;
        const sortFromUrl = searchParams.get('sort') as SortFieldEnums;
        const searchFromUrl = searchParams.get('search');
        const typeFromUrl = searchParams.get('type') as WorkTypeEnums;

        if (orderFromUrl) {
            dispatch(reviewListPageActions.setOrder(orderFromUrl));
        }
        if (sortFromUrl) {
            dispatch(reviewListPageActions.setSort(sortFromUrl));
        }
        if (searchFromUrl) {
            dispatch(reviewListPageActions.setSearch(searchFromUrl));
        }
        if (typeFromUrl) {
            dispatch(reviewListPageActions.setType(typeFromUrl));
        }

        dispatch(reviewListPageActions.initState());
        dispatch(fetchReviewListService({}));
    }
});
