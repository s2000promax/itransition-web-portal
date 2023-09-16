import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ReviewListPage.module.scss';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Page } from '@/widgets/Page';

import {
    fetchNextReviewListPageService,
    initReviewListPageService,
    reviewListPageReducer,
} from '@/entities/UI/ReviewListPage';
import {
    FiltersContainer,
    ReviewInfiniteList,
    ViewSelectorContainer,
} from '@/features/ReviewListPage';
import { Greeting } from '@/features/UI/Greeting';

export interface ReviewListPageProps {
    className?: string;
}

const reducers: ReducersList = {
    reviewListPage: reviewListPageReducer,
};

const ReviewListPage = (props: ReviewListPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextReviewListPageService());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initReviewListPageService(searchParams));
    });

    const content = (
        <StickyContentLayout
            left={<ViewSelectorContainer />}
            right={<FiltersContainer />}
            content={
                <Page
                    data-testid="ReviewListPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.ReviewListPage, {}, [className])}
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

export default memo(ReviewListPage);
