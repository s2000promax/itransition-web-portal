import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './Filters.module.scss';
import { SortOrderT } from '@/shared/types/sort.type';
import { Card } from '@/shared/UI-kit/Card';
import { VStack } from '@/shared/UI-kit/Stack';
import { Input } from '@/shared/UI-kit/Input';
import { Icon } from '@/shared/UI-kit/Icon';
import SearchIcon from '@/shared/assets/ui/icons/search.svg';
import { TypeTabs } from '@/features/UI/TypeTabs';
import { SortSelector } from '@/features/UI/SortSelector';
import { WorkTypeEnums } from '@/entities/Work';
import { SortFieldEnums } from '@/entities/UI/UI';

interface FiltersProps {
    className?: string;
    sort: SortFieldEnums;
    order: SortOrderT;
    type: WorkTypeEnums;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrderT) => void;
    onChangeSort: (newSort: SortFieldEnums) => void;
    onChangeType: (type: WorkTypeEnums) => void;
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
            className={classNames(cls.Filters, {}, [className])}
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
