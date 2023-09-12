import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ReviewsList.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { HStack } from '@/shared/UI-kit/Stack';
import { ListItemSkeleton } from './ListItemSkeleton/ListItemSkeleton';
import { ListItem } from './ListItem/ListItem';
import { ReviewI, ReviewViewEnums } from '@/entities/Review';

interface ReviewListProps {
    className?: string;
    reviewsList: ReviewI[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: ReviewViewEnums;
}

const getSkeletons = (view: ReviewViewEnums) =>
    new Array(view === ReviewViewEnums.SMALL ? 9 : 3)
        .fill(0)
        .map((_, index) => (
            <ListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ));

export const ReviewList = memo((props: ReviewListProps) => {
    const {
        className,
        reviewsList,
        view = ReviewViewEnums.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation('reviews_list');

    if (!isLoading && !reviewsList.length) {
        return (
            <div
                className={classNames(cls.ReviewList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text
                    size="l"
                    text={t('reviews_no_found')}
                />
            </div>
        );
    }

    return (
        <HStack
            wrap="wrap"
            gap="16"
            className={classNames(cls.ReviewList, {}, [])}
            data-testid="ReviewList"
        >
            {reviewsList.map((item) => (
                <ListItem
                    review={item}
                    view={view}
                    target={target}
                    key={item.id}
                    className={cls.card}
                />
            ))}
            {isLoading && getSkeletons(view)}
        </HStack>
    );
});
