import { memo, useCallback } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Page } from '@/widgets/Page';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import {
    FiltersContainer,
    ViewSelectorContainer,
    WorkInfiniteListPage,
} from '@/features/WorkListPage';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';
import { useSearchParams } from 'react-router-dom';
import {
    fetchNextWorkListPageService,
    initWorkListPageService,
    workListPageReducer,
} from '@/entities/UI/WorkListPage';

export interface WorkListPageProps {
    className?: string;
}

const reducers: ReducersList = {
    workListPage: workListPageReducer,
};

const WorkListPage = ({ className }: WorkListPageProps) => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const handleFetchWorkListData = useCallback(() => {
        dispatch(initWorkListPageService(searchParams));
    }, [dispatch, searchParams]);

    const debounceFetchWorkListData = useDebounce(handleFetchWorkListData, 300);

    useInitialEffect(() => {
        debounceFetchWorkListData();
    });

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextWorkListPageService());
    }, [dispatch]);

    const content = (
        <>
            <BrowserView>
                <StickyContentLayout
                    left={<ViewSelectorContainer />}
                    right={<FiltersContainer />}
                    content={
                        <Page
                            data-testid="WorkListPage"
                            onScrollEnd={onLoadNextPart}
                            className={classNames('', {}, [className])}
                        >
                            <WorkInfiniteListPage className={className} />
                        </Page>
                    }
                />
            </BrowserView>
            <MobileView>
                <Page
                    data-testid="WorkListPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames('', {}, [className])}
                >
                    <WorkInfiniteListPage className={className} />
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

export default memo(WorkListPage);
