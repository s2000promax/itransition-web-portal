import React, { memo } from 'react';
import { Card } from '@/shared/UI-kit/Card';
import { Work } from '@/features/Work';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './WorkDetailsContainer.module.scss';
import { BackButton } from '@/shared/UI-kit/BackButton';
import { AppLink } from '@/shared/UI-kit/AppLink';
import {
    getRouteReviewCreate,
    getRouteWorkEdit,
} from '@/shared/routes/routes.patterns';
import { HStack } from '@/shared/UI-kit/Stack';
import { useSelector } from 'react-redux';
import { getUserDataSelector, isUserRoleAdminSelector } from '@/entities/User';
import { CreateButton } from '@/shared/UI-kit/CreateButton';
import { EditButton } from '@/shared/UI-kit/EditButton';

interface WorkDetailsContainerProps {
    className?: string;
    workId?: string;
}

export const WorkDetailsContainer = memo((props: WorkDetailsContainerProps) => {
    const { className, workId } = props;
    const isAuth = useSelector(getUserDataSelector);
    const isUserRoleAdmin = useSelector(isUserRoleAdminSelector);

    if (workId) {
        return (
            <Card
                fullWidth
                border="partial"
                className={classNames(cls.WorkDetailsContainer, {}, [
                    className,
                ])}
                padding="24"
            >
                <BackButton className={cls.backButton} />
                {isAuth && (
                    <HStack
                        className={cls.control}
                        align="center"
                        gap="8"
                    >
                        <AppLink to={getRouteReviewCreate()}>
                            <CreateButton />
                        </AppLink>
                        {isUserRoleAdmin && (
                            <AppLink to={getRouteWorkEdit(workId)}>
                                <EditButton />
                            </AppLink>
                        )}
                    </HStack>
                )}
                <Work
                    workId={workId}
                    className={className}
                />
            </Card>
        );
    } else {
        return null;
    }
});
