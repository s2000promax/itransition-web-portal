import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './MainPage.module.scss';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import {
    fetchNextReviewsPageService,
    initReviewsPageService,
    reviewsPageReducer,
} from '@/entities/UI/ReviewsPage';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useSearchParams } from 'react-router-dom';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import {
    FiltersContainer,
    ReviewInfiniteList,
    ViewSelectorContainer,
} from '@/features/ReviewsPage';
import { Page } from '@/widgets/Page';

import { Greeting } from '@/features/UI/Greeting';

interface MainPageProps {
    className?: string;
}

const reducers: ReducersList = {
    reviewsPage: reviewsPageReducer,
};

const MainPage = (props: MainPageProps) => {
    const { className } = props;
    const { t } = useTranslation('main');
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
                    data-testid="MainPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.MainPage, {}, [className])}
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

export default memo(MainPage);
