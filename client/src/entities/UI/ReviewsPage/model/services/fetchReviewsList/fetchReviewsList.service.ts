import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ReviewI, ReviewTypeEnums } from '@/entities/Review';
import { addQueryParams } from '@/shared/libs/url';
import { getReviewsPageLimitSelector } from '../../selectors/getReviewsPageLimit/getReviewsPageLimit.selector';
import { getReviewsPageSortSelector } from '../../selectors/getReviewsPageSort/getReviewsPageSort.selector';
import { getReviewsPageOrderSelector } from '../../selectors/getReviewsPageOrder/getReviewsPageOrder.selector';
import { getReviewsPageSearchSelector } from '../../selectors/getReviewsPageSearch/getReviewsPageSearch.selector';
import { getReviewsPageNumberSelector } from '../../selectors/getReviewsPageNum/getReviewsPageNumber.selector';
import { getReviewsPageTypeSelector } from '../../selectors/getReviewsPageType/getReviewsPageType.selector';

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchReviewsListService = createAsyncThunk<
    ReviewI[],
    FetchArticlesListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const limit = getReviewsPageLimitSelector(getState());
    const sort = getReviewsPageSortSelector(getState());
    const order = getReviewsPageOrderSelector(getState());
    const search = getReviewsPageSearchSelector(getState());
    const page = getReviewsPageNumberSelector(getState());
    const type = getReviewsPageTypeSelector(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        });
        const response = await extra.api.get<ReviewI[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                q: search,
                type: type === ReviewTypeEnums.ALL ? undefined : type,
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