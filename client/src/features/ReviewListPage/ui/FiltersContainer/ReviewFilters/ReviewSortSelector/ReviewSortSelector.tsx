import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ReviewSortSelector.module.scss';
import { SortOrderT } from '@/shared/types/sort.type';
import { ListBox } from '@/shared/UI-kit/Popups';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { SelectOptionsT } from '@/shared/types/selectOptions.type';
import { ReviewSortFieldEnums } from '@/entities/UI/ReviewListPage';

interface SortSelectorProps {
    className?: string;
    sort: ReviewSortFieldEnums;
    order: SortOrderT;
    onChangeOrder: (newOrder: SortOrderT) => void;
    onChangeSort: (newSort: ReviewSortFieldEnums) => void;
}

export const ReviewSortSelector = memo((props: SortSelectorProps) => {
    const { className, onChangeOrder, onChangeSort, order, sort } = props;
    const { t } = useTranslation('reviewList');

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
                value: ReviewSortFieldEnums.CREATED_AT,
                content: t('create_at'),
            },
            {
                value: ReviewSortFieldEnums.TITLE,
                content: t('title'),
            },
            {
                value: ReviewSortFieldEnums.WORK_TITLE,
                content: t('work_title'),
            },
            {
                value: ReviewSortFieldEnums.LIKES,
                content: t('likes'),
            },
            {
                value: ReviewSortFieldEnums.VIEW_COUNTER,
                content: t('views'),
            },
        ],
        [t],
    );

    return (
        <div className={classNames(cls.ReviewSortSelector, {}, [className])}>
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
