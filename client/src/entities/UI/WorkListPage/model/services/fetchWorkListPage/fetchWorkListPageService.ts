import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { addQueryParams } from '@/shared/libs/url';
import { getWorkListPageLimitSelector } from '@/entities/UI/WorkListPage/model/selectors/getWorkListPageLimit/getWorkListPageLimit.selector';
import { getWorkListPageSortSelector } from '@/entities/UI/WorkListPage/model/selectors/getWorkListPageSort/getWorkListPageSort.selector';
import { getWorkListPageOrderSelector } from '@/entities/UI/WorkListPage/model/selectors/getWorkListPageOrder/getWorkListPageOrder.selector';
import { getWorkListPageSearchSelector } from '@/entities/UI/WorkListPage/model/selectors/getWorkListPageSearch/getWorkListPageSearch.selector';
import { getWorkListPageNumberSelector } from '@/entities/UI/WorkListPage/model/selectors/getWorkListPageNumber/getWorkListPageNumber.selector';
import { getWorkListPageTypeSelector } from '@/entities/UI/WorkListPage/model/selectors/getWorkListPageType/getWorkListPageType.selector';
import { WorkI } from '@/entities/Work';

interface FetchWorkListPageProps {
    replace?: boolean;
}

export const fetchWorkListPageService = createAsyncThunk<
    WorkI[],
    FetchWorkListPageProps,
    ThunkConfig<string>
>('workListPage/fetchWorkListPage', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const limit = getWorkListPageLimitSelector(getState());
    const sort = getWorkListPageSortSelector(getState());
    const order = getWorkListPageOrderSelector(getState());
    const search = getWorkListPageSearchSelector(getState());
    const page = getWorkListPageNumberSelector(getState());
    const type = getWorkListPageTypeSelector(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        });
        const response = await extra.api.get<WorkI[]>('work/workList', {
            params: {
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                q: search,
                type: type,
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
