import { memo, useCallback, useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/libs/classNames/classNames';
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
import { useSelector } from 'react-redux';
import { getUserSettings } from '@/entities/User';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';
import { tagReducer } from '@/entities/Tag';

export interface ReviewListPageProps {
    className?: string;
}

const reducers: ReducersList = {
    reviewListPage: reviewListPageReducer,
    tag: tagReducer,
};

const ReviewListPage = (props: ReviewListPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const { isReviewsPageWasOpened } = useSelector(getUserSettings);
    const localIsReviewsPageWasOpened = PersistenceService.get(
        LocalStorageEnums.IS_REVIEW_PAGE_WAS_OPEN,
    );

    useEffect(() => {
        dispatch(initReviewListPageService(searchParams));
    }, []);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextReviewListPageService());
    }, [dispatch]);

    const content = (
        <>
            <BrowserView>
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
                            {!isReviewsPageWasOpened &&
                                !localIsReviewsPageWasOpened && <Greeting />}
                        </Page>
                    }
                />
            </BrowserView>
            <MobileView>
                <Page
                    data-testid="ReviewListPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames('', {}, [className])}
                >
                    <ReviewInfiniteList className={className} />
                    {!isReviewsPageWasOpened &&
                        !localIsReviewsPageWasOpened && <Greeting />}
                </Page>
            </MobileView>
        </>
    );

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ReviewListPage);
