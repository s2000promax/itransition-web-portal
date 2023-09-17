import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './WorkFilters.module.scss';
import { SortOrderT } from '@/shared/types/sort.type';
import { Card } from '@/shared/UI-kit/Card';
import { VStack } from '@/shared/UI-kit/Stack';
import { Input } from '@/shared/UI-kit/Input';
import { Icon } from '@/shared/UI-kit/Icon';
import SearchIcon from '@/shared/assets/ui/icons/search.svg';
import { TypeTabs } from '@/features/UI/TypeTabs';
import { WorkTypeEnums } from '@/entities/Work';
import { WorkSortFieldEnums } from '@/entities/UI/WorkListPage';
import { WorkSortSelector } from '@/features/WorkListPage/ui/FiltersContainer/WorkFilters/WorkSortSelector/WorkSortSelector';

interface FiltersProps {
    className?: string;
    sort: WorkSortFieldEnums;
    order: SortOrderT;
    type: WorkTypeEnums;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrderT) => void;
    onChangeSort: (newSort: WorkSortFieldEnums) => void;
    onChangeType: (type: WorkTypeEnums) => void;
}

export const WorkFilters = memo((props: FiltersProps) => {
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
    const { t } = useTranslation('workListPage');

    return (
        <Card
            className={classNames(cls.WorkFilters, {}, [className])}
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
                <WorkSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});
