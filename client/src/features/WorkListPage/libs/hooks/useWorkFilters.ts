import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { SortOrderT } from '@/shared/types/sort.type';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';
import { WorkTypeEnums } from '@/entities/Work';
import { SortFieldEnums, ViewEnums } from '@/entities/UI/UI';
import {
    fetchWorkListPageService,
    getWorkListPageOrderSelector,
    getWorkListPageSearchSelector,
    getWorkListPageSortSelector,
    getWorkListPageTypeSelector,
    getWorkListPageViewSelector,
    workListPageActions,
    WorkSortFieldEnums,
} from '@/entities/UI/WorkListPage';

export function useWorkFilters() {
    const view = useSelector(getWorkListPageViewSelector);
    const sort = useSelector(getWorkListPageSortSelector);
    const order = useSelector(getWorkListPageOrderSelector);
    const search = useSelector(getWorkListPageSearchSelector);
    const type = useSelector(getWorkListPageTypeSelector);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchWorkListPageService({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ViewEnums) => {
            dispatch(workListPageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: WorkSortFieldEnums) => {
            dispatch(workListPageActions.setSort(newSort));
            dispatch(workListPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrderT) => {
            dispatch(workListPageActions.setOrder(newOrder));
            dispatch(workListPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(workListPageActions.setSearch(search));
            dispatch(workListPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeType = useCallback(
        (value: WorkTypeEnums) => {
            dispatch(workListPageActions.setType(value));
            dispatch(workListPageActions.setPage(1));
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
