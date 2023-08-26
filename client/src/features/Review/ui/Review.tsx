import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
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
    getReviewDataErrorSelector,
    getReviewDataLoadingSelector,
    reviewReducer,
} from '@/entities/Review';
import { ContentSkeleton } from '@/features/Review/ui/ContentSkeleton/ContentSkeleton';
import { Content } from '@/features/Review/ui/Content/Content';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';

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
    const isLoading = useSelector(getReviewDataLoadingSelector);
    const error = useSelector(getReviewDataErrorSelector);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            dispatch(fetchReviewByIdService(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = <ContentSkeleton />;
    } else if (error) {
        content = (
            <Text
                align="center"
                text={t('An error occurred while loading the article')}
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
