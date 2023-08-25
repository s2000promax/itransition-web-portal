import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ArticlesPage.module.scss';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { Page } from '@/widgets/Page';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import {
    fetchNextReviewsPageService,
    initReviewsPageService,
    reviewsPageReducer,
} from '@/entities/UI/ReviewsPage';

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
                    <ArticleInfiniteList className={cls.list} />
                    <ArticlePageGreeting />
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
