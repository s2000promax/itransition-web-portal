import React, { memo, useCallback } from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/UI-kit/Stack';
import { classNames } from '@/shared/libs/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import { dashboardReducer, fetchUserListService } from '@/entities/Dashboard';
import { DashboardCardHeader } from '@/features/Dashboard/DashboardCardHeader';
import { DashboardCard } from '@/features/Dashboard/DashboardCard';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';

export interface AdminDashboardPageProps {
    className?: string;
}

const reducers: ReducersList = {
    dashboard: dashboardReducer,
};

const AdminDashboardPage = (props: AdminDashboardPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const handleFetchUserList = useCallback(() => {
        dispatch(fetchUserListService());
    }, [dispatch]);

    const debouncedFetchUserList = useDebounce(handleFetchUserList, 300);

    useInitialEffect(() => {
        debouncedFetchUserList();
    });

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <Page className={classNames('', {}, [className])}>
                <VStack
                    gap="16"
                    max
                >
                    <DashboardCardHeader />
                    <DashboardCard />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(AdminDashboardPage);
