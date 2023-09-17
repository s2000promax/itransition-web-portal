import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortOrderT } from '@/shared/types/sort.type';
import { WorkTypeEnums } from '@/entities/Work';
import { SortFieldEnums } from '@/entities/UI/UI';
import { getWorkListPageInitedSelector } from '../../selectors/getWorkListPageInited/getWorkListPageInited.selector';
import { workListPageActions } from '../../slices/workListPage.slice';
import { fetchWorkListPageService } from '../fetchWorkListPage/fetchWorkListPageService';
import { WorkSortFieldEnums } from '@/entities/UI/WorkListPage';

export const initWorkListPageService = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('workListPage/initWorkListPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getWorkListPageInitedSelector(getState());

    if (!inited) {
        const orderFromUrl = searchParams.get('order') as SortOrderT;
        const sortFromUrl = searchParams.get('sort') as WorkSortFieldEnums;
        const searchFromUrl = searchParams.get('search');
        const typeFromUrl = searchParams.get('type') as WorkTypeEnums;

        if (orderFromUrl) {
            dispatch(workListPageActions.setOrder(orderFromUrl));
        }
        if (sortFromUrl) {
            dispatch(workListPageActions.setSort(sortFromUrl));
        }
        if (searchFromUrl) {
            dispatch(workListPageActions.setSearch(searchFromUrl));
        }
        if (typeFromUrl) {
            dispatch(workListPageActions.setType(typeFromUrl));
        }

        dispatch(workListPageActions.initState());
        dispatch(fetchWorkListPageService({}));
    }
});
