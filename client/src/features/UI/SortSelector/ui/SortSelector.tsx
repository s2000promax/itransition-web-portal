import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './SortSelector.module.scss';
import { SortOrderT } from '@/shared/types/sort.type';
import { ReviewSortFieldEnums } from '@/entities/Review';
import { ListBox } from '@/shared/UI-kit/Popups';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { SelectOptionsT } from '@/shared/types/selectOptions.type';

interface SortSelectorProps {
    className?: string;
    sort: ReviewSortFieldEnums;
    order: SortOrderT;
    onChangeOrder: (newOrder: SortOrderT) => void;
    onChangeSort: (newSort: ReviewSortFieldEnums) => void;
}

export const SortSelector = memo((props: SortSelectorProps) => {
    const { className, onChangeOrder, onChangeSort, order, sort } = props;
    const { t } = useTranslation('features_ui');

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

    const sortFieldOptions = useMemo<SelectOptionsT<ReviewSortFieldEnums>[]>(
        () => [
            {
                value: ReviewSortFieldEnums.CREATED,
                content: t('created_at'),
            },
            {
                value: ReviewSortFieldEnums.TITLE,
                content: t('name'),
            },
            {
                value: ReviewSortFieldEnums.VIEWS,
                content: t('views'),
            },
        ],
        [t],
    );

    return (
        <div className={classNames(cls.SortSelector, {}, [className])}>
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
