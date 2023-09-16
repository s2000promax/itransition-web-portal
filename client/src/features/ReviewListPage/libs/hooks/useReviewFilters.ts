import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    getReviewListPageOrderSelector,
    getReviewListPageSearchSelector,
    getReviewListPageSortSelector,
    getReviewListPageTypeSelector,
    getReviewListPageViewSelector,
    reviewListPageActions,
    fetchReviewListService,
} from '@/entities/UI/ReviewListPage';
import { SortOrderT } from '@/shared/types/sort.type';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';
import { WorkTypeEnums } from '@/entities/Work';
import { SortFieldEnums, ViewEnums } from '@/entities/UI/UI';

export function useReviewFilters() {
    const view = useSelector(getReviewListPageViewSelector);
    const sort = useSelector(getReviewListPageSortSelector);
    const order = useSelector(getReviewListPageOrderSelector);
    const search = useSelector(getReviewListPageSearchSelector);
    const type = useSelector(getReviewListPageTypeSelector);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchReviewListService({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ViewEnums) => {
            dispatch(reviewListPageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: SortFieldEnums) => {
            dispatch(reviewListPageActions.setSort(newSort));
            dispatch(reviewListPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrderT) => {
            dispatch(reviewListPageActions.setOrder(newOrder));
            dispatch(reviewListPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(reviewListPageActions.setSearch(search));
            dispatch(reviewListPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeType = useCallback(
        (value: WorkTypeEnums) => {
            dispatch(reviewListPageActions.setType(value));
            dispatch(reviewListPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return {
        view,
        sort,
        order,
        search,
        type,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType,
    };
}
