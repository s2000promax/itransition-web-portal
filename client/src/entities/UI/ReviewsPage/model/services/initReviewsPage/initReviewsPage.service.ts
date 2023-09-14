import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ReviewSortFieldEnums } from '@/entities/Review';
import { SortOrderT } from '@/shared/types/sort.type';
import { getReviewsPageInitedSelector } from '../../selectors/getReviewsPageInited/getReviewsPageInited.selector';
import { reviewsPageActions } from '@/entities/UI/ReviewsPage/model/slices/reviewsPage.slice';
import { fetchReviewListService } from '@/entities/UI/ReviewsPage/model/services/fetchReviewsList/fetchReviewListService';
import { WorkTypeEnums } from '@/entities/Work';

export const initReviewsPageService = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('reviewsPage/initReviewsPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getReviewsPageInitedSelector(getState());

    if (!inited) {
        const orderFromUrl = searchParams.get('order') as SortOrderT;
        const sortFromUrl = searchParams.get('sort') as ReviewSortFieldEnums;
        const searchFromUrl = searchParams.get('search');
        const typeFromUrl = searchParams.get('type') as WorkTypeEnums;

        if (orderFromUrl) {
            dispatch(reviewsPageActions.setOrder(orderFromUrl));
        }
        if (sortFromUrl) {
            dispatch(reviewsPageActions.setSort(sortFromUrl));
        }
        if (searchFromUrl) {
            dispatch(reviewsPageActions.setSearch(searchFromUrl));
        }
        if (typeFromUrl) {
            dispatch(reviewsPageActions.setType(typeFromUrl));
        }

        dispatch(reviewsPageActions.initState());
        dispatch(fetchReviewListService({}));
    }
});
