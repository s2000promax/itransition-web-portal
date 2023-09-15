import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/shared/UI-kit/Card';
import { Review } from '@/features/Review';
import { BackButton } from '@/shared/UI-kit/BackButton';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ReviewDetailsContainer.module.scss';
import { AppLink } from '@/shared/UI-kit/AppLink';
import { getRouteReviewEdit } from '@/shared/routes/routes.patterns';
import { HStack } from '@/shared/UI-kit/Stack';
import { useSelector } from 'react-redux';
import { isUserRoleAdminSelector } from '@/entities/User';
import { EditButton } from '@/shared/UI-kit/EditButton';

interface ReviewDetailsContainerProps {
    className?: string;
}

export const ReviewDetailsContainer = memo(
    (props: ReviewDetailsContainerProps) => {
        const { className } = props;
        const { id } = useParams<{ id: string }>();
        const isUserRoleAdmin = useSelector(isUserRoleAdminSelector);

        return (
            <Card
                fullWidth
                border="partial"
                className={classNames(cls.ReviewDetailsContainer, {}, [
                    className,
                ])}
                padding="24"
            >
                <BackButton className={cls.backButton} />
                <HStack className={cls.control}>
                    {isUserRoleAdmin && (
                        <AppLink to={getRouteReviewEdit(id!)}>
                            <EditButton />
                        </AppLink>
                    )}
                </HStack>
                <Review
                    id={id}
                    className={className}
                />
            </Card>
        );
    },
);
