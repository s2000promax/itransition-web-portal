import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './CommentCard.module.scss';
import { CommentI } from '@/entities/Comment';
import { getRouteProfile } from '@/shared/enums/router.enums';
import { Text } from '@/shared/UI-kit/Text';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Card } from '@/shared/UI-kit/Card';
import { AppLink } from '@/shared/UI-kit/AppLink';
import { Avatar } from '@/shared/UI-kit/Avatar';

interface CommentCardProps {
    className?: string;
    comment?: CommentI;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    if (isLoading) {
        return (
            <VStack
                data-testid="CommentCard.Loading"
                gap="8"
                max
                className={classNames(cls.CommentCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <div className={cls.header}>
                    <Skeleton
                        width={30}
                        height={30}
                        border="50%"
                    />
                    <Skeleton
                        height={16}
                        width={100}
                        className={cls.username}
                    />
                </div>
                <Skeleton
                    className={cls.text}
                    width="100%"
                    height={50}
                />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <Card
            padding="24"
            border="partial"
            fullWidth
        >
            <VStack
                data-testid="CommentCard.Content"
                gap="8"
                max
                className={classNames(cls.CommentCardRedesigned, {}, [
                    className,
                ])}
            >
                <AppLink to={getRouteProfile(comment.user.id)}>
                    <HStack gap="8">
                        {comment.user.avatar ? (
                            <Avatar
                                size={30}
                                src={comment.user.avatar}
                            />
                        ) : null}
                        <Text
                            text={comment.user.username}
                            bold
                        />
                    </HStack>
                </AppLink>
                <Text text={comment.text} />
            </VStack>
        </Card>
    );
});
