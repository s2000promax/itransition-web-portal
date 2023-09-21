import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './AdminTable.module.scss';
import { VStack } from '@/shared/UI-kit/Stack';
import { ControlPanel } from '@/features/Dashboard/DashboardCard/AdminTable/ControlPanel/ControlPanel';
import { UsersListTable } from '@/features/Dashboard/DashboardCard/AdminTable/UsersListTable/UsersListTable';
import { useSelector } from 'react-redux';
import { getDashboardUserListSelector } from '@/entities/Dashboard';

interface AdminTableProps {
    className?: string;
}

export const AdminTable = memo((props: AdminTableProps) => {
    const { className } = props;
    const userList = useSelector(getDashboardUserListSelector) || [];

    return (
        <VStack
            max
            gap="16"
            className={classNames(cls.AdminTable, {}, [className])}
        >
            <ControlPanel />
            <UsersListTable data={userList} />
        </VStack>
    );
});
