import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ProfileUserReviewListTable.module.scss';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { useSelector } from 'react-redux';
import { UserReviewListTable } from '@/features/Profile/ProfileUserReviewListTable/ui/UserReviewListTable/UserReviewListTable';
import { Card } from '@/shared/UI-kit/Card';
import { getProfileUserReviewListSelector } from '@/entities/Profile';
import { Skeleton } from '@/shared/UI-kit/Skeleton';

interface ProfileUserReviewListTableProps {
    className?: string;
    isLoading?: boolean;
}

export const ProfileUserReviewListTable = memo(
    (props: ProfileUserReviewListTableProps) => {
        const { className, isLoading } = props;
        const userReviewList =
            useSelector(getProfileUserReviewListSelector) || [];

        if (!isLoading) {
            return (
                <Card
                    padding="24"
                    border="partial"
                    fullWidth
                    className={classNames(cls.ProfileUserReviewListTable, {}, [
                        className,
                    ])}
                >
                    <UserReviewListTable data={userReviewList} />
                </Card>
            );
        } else {
            return (
                <HStack max>
                    <Skeleton
                        height={96}
                        width="100%"
                        border="16px"
                    />
                </HStack>
            );
        }
    },
);
