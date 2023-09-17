import { memo } from 'react';
import { useReviewFilters } from '../../libs/hooks/useReviewFilters';
import { ReviewFilters } from './ReviewFilters/ReviewFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const {
        onChangeSort,
        onChangeType,
        sort,
        type,
        onChangeSearch,
        search,
        onChangeOrder,
        order,
    } = useReviewFilters();

    return (
        <ReviewFilters
            type={type}
            onChangeSearch={onChangeSearch}
            order={order}
            onChangeOrder={onChangeOrder}
            search={search}
            sort={sort}
            onChangeSort={onChangeSort}
            onChangeType={onChangeType}
            className={className}
        />
    );
});
