import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './UserInfoCard.module.scss';
import { Avatar } from '@/shared/UI-kit/Avatar';
import { Text } from '@/shared/UI-kit/Text';
import { HStack } from '@/shared/UI-kit/Stack';
import { ReviewI } from '@/entities/Review';

interface UserInfoCardProps {
    className?: string;
    review?: ReviewI;
}

export const UserInfoCard = memo((props: UserInfoCardProps) => {
    const { className, review } = props;

    if (review) {
        return (
            <HStack
                gap="8"
                className={classNames(cls.UserInfoCard, {}, [className])}
            >
                <Avatar
                    size={32}
                    src={review.user?.avatar}
                    className={cls.avatar}
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
        );
    } else {
        return null;
    }
});
