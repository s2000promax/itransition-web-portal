import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ReviewI } from '@/entities/Review';
import { addQueryParams } from '@/shared/libs/url';
import { getReviewListPageLimitSelector } from '../../selectors/getReviewListPageLimit/getReviewListPageLimit.selector';
import { getReviewListPageSortSelector } from '../../selectors/getReviewListPageSort/getReviewListPageSort.selector';
import { getReviewListPageOrderSelector } from '../../selectors/getReviewListPageOrder/getReviewListPageOrder.selector';
import { getReviewListPageSearchSelector } from '../../selectors/getReviewListPageSearch/getReviewListPageSearch.selector';
import { getReviewListPageNumberSelector } from '../../selectors/getReviewListPageNumber/getReviewListPageNumber.selector';
import { getReviewListPageTypeSelector } from '../../selectors/getReviewListPageType/getReviewListPageType.selector';
import { WorkTypeEnums } from '@/entities/Work';

interface FetchReviewListProps {
    replace?: boolean;
}

export const fetchReviewListService = createAsyncThunk<
    ReviewI[],
    FetchReviewListProps,
    ThunkConfig<string>
>('reviewListPage/fetchReviewList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const limit = getReviewListPageLimitSelector(getState());
    const sort = getReviewListPageSortSelector(getState());
    const order = getReviewListPageOrderSelector(getState());
    const search = getReviewListPageSearchSelector(getState());
    const page = getReviewListPageNumberSelector(getState());
    const type = getReviewListPageTypeSelector(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        });
        const response = await extra.api.get<ReviewI[]>('review/reviewList', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                q: search,
                type: type === WorkTypeEnums.ALL ? undefined : type,
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
