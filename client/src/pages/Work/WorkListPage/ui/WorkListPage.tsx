import { classNames } from '@/shared/libs/classNames/classNames';
import { VStack } from '@/shared/UI-kit/Stack';
import { Page } from '@/widgets/Page';
import { WorkList } from '@/features/WorkList';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import {
    fetchWorkListDataService,
    getWorkListDataSelector,
    workReducer,
} from '@/entities/Work';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import {
    FiltersContainer,
    ViewSelectorContainer,
} from '@/features/ReviewsPage';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';

export interface WorkListPageProps {
    className?: string;
}

const reducers: ReducersList = {
    work: workReducer,
};

const WorkListPage = ({ className }: WorkListPageProps) => {
    const dispatch = useAppDispatch();
    const workList = useSelector(getWorkListDataSelector);

    const handleFetchWorkListData = useCallback(() => {
        dispatch(fetchWorkListDataService());
    }, [dispatch]);

    const debouncedFetchWorkListData = useDebounce(
        handleFetchWorkListData,
        300,
    );

    useInitialEffect(() => {
        debouncedFetchWorkListData();
    });

    const content = (
        <StickyContentLayout
            left={<ViewSelectorContainer />}
            right={<FiltersContainer />}
            content={
                <Page
                    data-testid="WorkListPage"
                    className={classNames('', {}, [className])}
                >
                    <VStack
                        gap="16"
                        max
                    >
                        <WorkList workList={workList} />
                    </VStack>
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

export default WorkListPage;
