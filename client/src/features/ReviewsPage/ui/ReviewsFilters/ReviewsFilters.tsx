import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ReviewsFilters.module.scss';
import { useReviewFilters } from '../../libs/hooks/useReviewFilters';
import { Card } from '@/shared/UI-kit/Card';
import { Input } from '@/shared/UI-kit/Input';
import { SortSelector } from '@/features/UI/SortSelector';
import { ViewSelector } from '@/features/UI/ViewSelector';
import { TypeTabs } from '@/features/UI/TypeTabs';

interface ReviewsFiltersProps {
    className?: string;
}

export const ReviewsFilters = memo((props: ReviewsFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation('reviews_page');
    const {
        onChangeSort,
        onChangeType,
        sort,
        type,
        onChangeSearch,
        search,
        onChangeView,
        view,
        onChangeOrder,
        order,
    } = useReviewFilters();

    return (
        <div className={classNames(cls.ReviewsFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <SortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
            </div>
            <Card className={cls.search}>
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('search')}
                />
            </Card>
            <TypeTabs
                value={type}
                onChangeType={onChangeType}
                className={cls.tabs}
            />
        </div>
    );
});
