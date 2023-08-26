import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ReviewsPage.module.scss';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Page } from '@/widgets/Page';

import {
    fetchNextReviewsPageService,
    initReviewsPageService,
    reviewsPageReducer,
} from '@/entities/UI/ReviewsPage';
import {
    FiltersContainer,
    ReviewInfiniteList,
    ViewSelectorContainer,
} from '@/features/ReviewsPage';
import { Greeting } from '@/features/UI/Greeting';

interface ReviewsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    reviewsPage: reviewsPageReducer,
};

const ReviewsPage = (props: ReviewsPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextReviewsPageService());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initReviewsPageService(searchParams));
    });

    const content = (
        <StickyContentLayout
            left={<ViewSelectorContainer />}
            right={<FiltersContainer />}
            content={
                <Page
                    data-testid="ReviewsPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.ReviewsPage, {}, [className])}
                >
                    <ReviewInfiniteList className={cls.list} />
                    <Greeting />
                </Page>
            }
        />
    );

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount={false}
        >
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ReviewsPage);
