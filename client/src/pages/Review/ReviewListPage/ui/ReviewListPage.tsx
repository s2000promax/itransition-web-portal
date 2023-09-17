import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/libs/classNames/classNames';
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
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';

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

    const handleInitReviewListPageService = useCallback(() => {
        dispatch(initReviewListPageService(searchParams));
    }, [dispatch]);

    const debouncedInitReviewListPageService = useDebounce(
        handleInitReviewListPageService,
        300,
    );

    useInitialEffect(() => {
        // debouncedInitReviewListPageService();
        dispatch(initReviewListPageService(searchParams));
    });

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextReviewListPageService());
    }, [dispatch]);

    const content = (
        <StickyContentLayout
            left={<ViewSelectorContainer />}
            right={<FiltersContainer />}
            content={
                <Page
                    data-testid="ReviewListPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames('', {}, [className])}
                >
                    <ReviewInfiniteList className={className} />
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
