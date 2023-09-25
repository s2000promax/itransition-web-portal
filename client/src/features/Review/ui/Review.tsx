import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './Review.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import {
    getReviewErrorSelector,
    getReviewIsLoadingSelector,
    updateReviewViewCounterService,
} from '@/entities/Review';
import { ContentSkeleton } from './ContentSkeleton/ContentSkeleton';
import { Content } from './Content/Content';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';

interface ReviewProps {
    className?: string;
    id?: string;
}

export const Review = memo((props: ReviewProps) => {
    const { className, id } = props;
    const { t } = useTranslation('review');
    const isLoading = useSelector(getReviewIsLoadingSelector);
    const dispatch = useAppDispatch();
    const error = useSelector(getReviewErrorSelector);

    const handleUpdateReviewViewCounter = useCallback(() => {
        if (id) {
            dispatch(updateReviewViewCounterService({ reviewId: id }));
        }
    }, [dispatch, id]);

    const debounceUpdateReviewViewCounter = useDebounce(
        handleUpdateReviewViewCounter,
        300,
    );

    useEffect(() => {
        if (id) {
            debounceUpdateReviewViewCounter();
        }
    }, [id]);

    let content;

    if (isLoading) {
        content = <ContentSkeleton />;
    } else if (error) {
        content = (
            <Text
                align="center"
                text={t('error')}
            />
        );
    } else {
        content = <Content />;
    }

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.Review, {}, [className])}
        >
            {content}
        </VStack>
    );
});
