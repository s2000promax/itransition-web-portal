import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    getReviewsPageOrderSelector,
    getReviewsPageSearchSelector,
    getReviewsPageSortSelector,
    getReviewsPageTypeSelector,
    getReviewsPageViewSelector,
    reviewsPageActions,
    fetchReviewsListService,
} from '@/entities/UI/ReviewsPage';
import {
    ReviewSortFieldEnums,
    ReviewTypeEnums,
    ReviewViewEnums,
} from '@/entities/Review';
import { SortOrderT } from '@/shared/types/sort.type';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';

export function useReviewFilters() {
    const view = useSelector(getReviewsPageViewSelector);
    const sort = useSelector(getReviewsPageSortSelector);
    const order = useSelector(getReviewsPageOrderSelector);
    const search = useSelector(getReviewsPageSearchSelector);
    const type = useSelector(getReviewsPageTypeSelector);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchReviewsListService({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: ReviewViewEnums) => {
            dispatch(reviewsPageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: ReviewSortFieldEnums) => {
            dispatch(reviewsPageActions.setSort(newSort));
            dispatch(reviewsPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrderT) => {
            dispatch(reviewsPageActions.setOrder(newOrder));
            dispatch(reviewsPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(reviewsPageActions.setSearch(search));
            dispatch(reviewsPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeType = useCallback(
        (value: ReviewTypeEnums) => {
            dispatch(reviewsPageActions.setType(value));
            dispatch(reviewsPageActions.setPage(1));
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
