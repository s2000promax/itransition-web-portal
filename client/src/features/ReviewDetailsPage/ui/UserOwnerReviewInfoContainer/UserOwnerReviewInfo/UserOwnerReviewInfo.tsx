import { memo, useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './UserOwnerReviewInfo.module.scss';
import { UserI } from '@/entities/User';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Avatar } from '@/shared/UI-kit/Avatar';
import { Text } from '@/shared/UI-kit/Text';
import { AppLink } from '@/shared/UI-kit/AppLink';
import { getRouteProfile } from '@/shared/routes/routes.patterns';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';
import { Icon } from '@/shared/UI-kit/Icon';
import EyeIcon from '@/shared/assets/ui/icons/eye.svg';
// import LikeIcon from '@/shared/assets/ui/icons/like-heart.svg';

import { Like } from '@/shared/UI-kit/Like';

interface UserOwnerReviewInfoProps {
    className?: string;
    authorReview: UserI;
    createdAt: Date;
    views: number;
    likes: number;
}

export const UserOwnerReviewInfo = memo((props: UserOwnerReviewInfoProps) => {
    const { className, authorReview, createdAt, views, likes } = props;

    const onLike = useCallback(() => {
        console.log('Like!');
    }, []);

    return (
        <VStack
            gap="8"
            className={classNames('', {}, [className])}
        >
            <AppLink to={getRouteProfile(authorReview.id)}>
                <VStack gap="8">
                    <HStack gap="8">
                        <Avatar
                            src={authorReview.avatar}
                            size={32}
                        />
                        <Text
                            text={authorReview.firstName}
                            bold
                        />
                        <Text
                            text={authorReview.lastName}
                            bold
                        />
                    </HStack>

                    <Text text={DateFormatter(createdAt)} />
                </VStack>
            </AppLink>
            <HStack
                justify="between"
                max
            >
                <HStack gap="8">
                    <Like onLike={onLike} />
                    <Text text={String(views ?? 0)} />
                </HStack>
                <HStack gap="8">
                    <Icon Svg={EyeIcon} />
                    <Text text={String(views ?? 0)} />
                </HStack>
            </HStack>
        </VStack>
    );
});
