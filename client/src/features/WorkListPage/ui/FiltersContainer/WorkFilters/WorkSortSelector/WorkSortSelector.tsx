import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './WorkSortSelector.module.scss';
import { SortOrderT } from '@/shared/types/sort.type';
import { ListBox } from '@/shared/UI-kit/Popups';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { SelectOptionsT } from '@/shared/types/selectOptions.type';
import { WorkSortFieldEnums } from '@/entities/UI/WorkListPage';

interface SortSelectorProps {
    className?: string;
    sort: WorkSortFieldEnums;
    order: SortOrderT;
    onChangeOrder: (newOrder: SortOrderT) => void;
    onChangeSort: (newSort: WorkSortFieldEnums) => void;
}

export const WorkSortSelector = memo((props: SortSelectorProps) => {
    const { className, onChangeOrder, onChangeSort, order, sort } = props;
    const { t } = useTranslation('workListPage');

    const orderOptions = useMemo<SelectOptionsT<SortOrderT>[]>(
        () => [
            {
                value: 'asc',
                content: t('ascending'),
            },
            {
                value: 'desc',
                content: t('descending'),
            },
        ],
        [t],
    );

    const sortFieldOptions = useMemo<SelectOptionsT<WorkSortFieldEnums>[]>(
        () => [
            {
                value: WorkSortFieldEnums.RELEASE_DATE,
                content: t('release_date'),
            },
            {
                value: WorkSortFieldEnums.TITLE,
                content: t('name'),
            },
            {
                value: WorkSortFieldEnums.AVERAGE_REVIEWS_RATING,
                content: t('reviews_rating'),
            },
            {
                value: WorkSortFieldEnums.AVERAGE_USERS_RATING,
                content: t('users_rating'),
            },
        ],
        [t],
    );

    return (
        <div className={classNames(cls.WorkSortSelector, {}, [className])}>
            <VStack gap="8">
                <Text text={t('sort_by')} />
                <ListBox
                    items={sortFieldOptions}
                    value={sort}
                    onChange={onChangeSort}
                />
                <ListBox
                    items={orderOptions}
                    value={order}
                    onChange={onChangeOrder}
                />
            </VStack>
        </div>
    );
});
