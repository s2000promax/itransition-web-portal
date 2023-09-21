import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './Review.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import {
    fetchReviewByIdService,
    getReviewErrorSelector,
    getReviewIsLoadingSelector,
    reviewReducer,
    updateReviewViewCounterService,
} from '@/entities/Review';
import { ContentSkeleton } from './ContentSkeleton/ContentSkeleton';
import { Content } from './Content/Content';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';

interface ReviewProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    review: reviewReducer,
};

export const Review = memo((props: ReviewProps) => {
    const { className, id } = props;
    const { t } = useTranslation('review');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getReviewIsLoadingSelector);
    const error = useSelector(getReviewErrorSelector);

    const handleInit = useCallback(() => {
        if (id) {
            dispatch(fetchReviewByIdService(id));
            dispatch(updateReviewViewCounterService({ reviewId: id }));
        }
    }, [dispatch, id]);
    const debouncedInit = useDebounce(handleInit, 300);

    useInitialEffect(() => {
        debouncedInit();
    });

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
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <VStack
                gap="16"
                max
                className={classNames(cls.Review, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
