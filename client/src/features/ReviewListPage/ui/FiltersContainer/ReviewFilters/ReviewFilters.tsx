import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ReviewFilters.module.scss';
import { SortOrderT } from '@/shared/types/sort.type';
import { Card } from '@/shared/UI-kit/Card';
import { VStack } from '@/shared/UI-kit/Stack';
import { Input } from '@/shared/UI-kit/Input';
import { Icon } from '@/shared/UI-kit/Icon';
import SearchIcon from '@/shared/assets/ui/icons/search.svg';
import { TypeTabs } from '@/features/UI/TypeTabs';
import { WorkTypeEnums } from '@/entities/Work';
import { ReviewSortFieldEnums } from '@/entities/UI/ReviewListPage';
import { ReviewSortSelector } from './ReviewSortSelector/ReviewSortSelector';
import { ReviewTagSelector } from '@/features/ReviewListPage/ui/FiltersContainer/ReviewFilters/ReviewTagSelector/ReviewTagSelector';

interface FiltersProps {
    className?: string;
    sort: ReviewSortFieldEnums;
    order: SortOrderT;
    type: WorkTypeEnums;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrderT) => void;
    onChangeSort: (newSort: ReviewSortFieldEnums) => void;
    onChangeType: (type: WorkTypeEnums) => void;
}

export const ReviewFilters = memo((props: FiltersProps) => {
    const {
        className,
        onChangeType,
        onChangeSearch,
        search,
        onChangeSort,
        sort,
        onChangeOrder,
        order,
        type,
    } = props;
    const { t } = useTranslation('reviewList');

    return (
        <Card
            className={classNames(cls.ReviewFilters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    size="s"
                    placeholder={t('search')}
                    addonLeft={<Icon Svg={SearchIcon} />}
                />
                <TypeTabs
                    value={type}
                    onChangeType={onChangeType}
                />
                <ReviewTagSelector />
                <ReviewSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});
