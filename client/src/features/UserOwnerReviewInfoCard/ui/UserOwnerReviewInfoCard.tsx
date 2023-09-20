import React, { useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './UserOwnerReviewInfoCard.module.scss';
import { AppLink } from '@/shared/UI-kit/AppLink';
import {
    getRouteProfile,
    getRouteReviewEdit,
} from '@/shared/routes/routes.patterns';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Avatar } from '@/shared/UI-kit/Avatar';
import { Text } from '@/shared/UI-kit/Text';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';
import { Like } from '@/shared/UI-kit/Like';
import { Icon } from '@/shared/UI-kit/Icon';
import EyeIcon from '@/shared/assets/ui/icons/eye.svg';
import LikeIcon from '@/shared/assets/ui/icons/like-heart.svg';
import { ReviewI } from '@/entities/Review';
import { Card } from '@/shared/UI-kit/Card';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { useSelector } from 'react-redux';
import { getUserDataSelector } from '@/entities/User';
import { EditButton } from '@/shared/UI-kit/EditButton';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { likeUserByReviewService } from '@/entities/Like';

interface UserInfoCardProps {
    className?: string;
    review?: ReviewI;
}

export const UserOwnerReviewInfoCard = (props: UserInfoCardProps) => {
    const { className, review } = props;
    const dispatch = useAppDispatch();
    const currentUser = useSelector(getUserDataSelector);

    const onLike = useCallback(() => {
        if (currentUser?.id && review?.id) {
            dispatch(
                likeUserByReviewService({
                    userId: currentUser.id,
                    reviewId: review.id,
                }),
            );
        }
    }, [review, currentUser?.id]);

    if (review) {
        return (
            <Card
                padding="24"
                border="partial"
                className={classNames(cls.UserOwnerReviewInfoCard, {}, [
                    className,
                ])}
            >
                {currentUser?.id === review.user?.id && (
                    <HStack className={cls.control}>
                        <AppLink to={getRouteReviewEdit(review.id)}>
                            <EditButton />
                        </AppLink>
                    </HStack>
                )}

                <VStack gap="8">
                    <AppLink to={getRouteProfile(review.user?.id!)}>
                        <VStack gap="8">
                            <HStack gap="8">
                                <Avatar
                                    src={review.user?.avatar!}
                                    size={32}
                                />
                                <Text
                                    text={review.user?.firstName}
                                    bold
                                />
                                <Text
                                    text={review.user?.lastName}
                                    bold
                                />
                            </HStack>

                            <Text text={DateFormatter(review.createdAt)} />
                        </VStack>
                    </AppLink>
                    <HStack
                        justify="between"
                        max
                    >
                        <HStack gap="8">
                            {currentUser ? (
                                <Like onLike={onLike} />
                            ) : (
                                <Icon
                                    Svg={LikeIcon}
                                    width={26}
                                    height={24}
                                />
                            )}

                            <Text
                                text={String(review.user?.likesCounter ?? 0)}
                            />
                        </HStack>
                        <HStack gap="8">
                            <Icon Svg={EyeIcon} />
                            <Text text={String(review.viewCounter ?? 0)} />
                        </HStack>
                    </HStack>
                </VStack>
            </Card>
        );
    } else {
        return (
            <>
                <Skeleton
                    width="100%"
                    height={150}
                    border="32px"
                />
            </>
        );
    }
};
