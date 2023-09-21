import React from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardCardError } from '@/features/Dashboard/DashboardCard/DashboardCardError/DashboardCardError';
import { DashboardCardSkeleton } from '@/features/Dashboard/DashboardCard/DashboardCardCardSkeleton/DashboardCardSkeleton';
import { Card } from '@/shared/UI-kit/Card';
import { VStack } from '@/shared/UI-kit/Stack';
import { useSelector } from 'react-redux';
import {
    getDashboardErrorSelector,
    getDashboardIsLoadingSelector,
    getDashboardUserListSelector,
} from '@/entities/Dashboard';

export interface DashboardCardProps {
    className?: string;
}

export const DashboardCard = (props: DashboardCardProps) => {
    const { className } = props;
    const { t } = useTranslation('adminPage');
    const isLoading = useSelector(getDashboardIsLoadingSelector);
    const error = useSelector(getDashboardErrorSelector);
    const userList = useSelector(getDashboardUserListSelector);

    if (isLoading) {
        return <DashboardCardSkeleton />;
    }

    if (error) {
        return <DashboardCardError />;
    }

    return (
        <Card
            padding="24"
            border="partial"
            fullWidth
            className={className}
        >
            <VStack gap="32">
                <p>Content</p>
            </VStack>
        </Card>
    );
};
