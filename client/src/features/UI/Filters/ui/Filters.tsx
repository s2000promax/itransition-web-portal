import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './Filters.module.scss';
import { ReviewSortFieldEnums, ReviewTypeEnums } from '@/entities/Review';
import { SortOrderT } from '@/shared/types/sort.type';
import { Card } from '@/shared/UI-kit/Card';
import { VStack } from '@/shared/UI-kit/Stack';
import { Input } from '@/shared/UI-kit/Input';
import { Icon } from '@/shared/UI-kit/Icon';
import SearchIcon from '@/shared/assets/ui/icons/search.svg';
import { TypeTabs } from '@/features/UI/TypeTabs';
import { SortSelector } from '@/features/UI/SortSelector';

interface FiltersProps {
    className?: string;
    sort: ReviewSortFieldEnums;
    order: SortOrderT;
    type: ReviewTypeEnums;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrderT) => void;
    onChangeSort: (newSort: ReviewSortFieldEnums) => void;
    onChangeType: (type: ReviewTypeEnums) => void;
}

export const Filters = memo((props: FiltersProps) => {
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
    const { t } = useTranslation('filters');

    return (
        <Card
            className={classNames(cls.ArticlesFilters, {}, [className])}
            padding="24"
        >
            <VStack gap="32">
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    size="s"
                    placeholder={t('Поиск')}
                    addonLeft={<Icon Svg={SearchIcon} />}
                />
                <TypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
                <SortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});
