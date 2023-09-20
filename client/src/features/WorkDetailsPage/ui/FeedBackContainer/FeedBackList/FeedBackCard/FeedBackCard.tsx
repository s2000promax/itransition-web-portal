import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './FeedBackCard.module.scss';
import { CommentI } from '@/entities/Comment';
import { Text } from '@/shared/UI-kit/Text';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { VStack } from '@/shared/UI-kit/Stack';
import { Card } from '@/shared/UI-kit/Card';

interface CommentCardProps {
    className?: string;
    feedback?: CommentI;
    isLoading?: boolean;
}

export const FeedBackCard = memo((props: CommentCardProps) => {
    const { className, feedback, isLoading } = props;

    if (isLoading) {
        return (
            <VStack
                data-testid="FeedBackCard.Loading"
                gap="8"
                max
                className={classNames(cls.FeedBackCard, {}, [
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

    if (!feedback) {
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
                className={classNames(cls.CommentCard, {}, [className])}
            >
                {/*<AppLink to={getRouteProfile(comment.user.id)}>*/}
                {/*    <HStack gap="8">*/}
                {/*        {comment.user.avatar ? (*/}
                {/*            <Avatar*/}
                {/*                size={30}*/}
                {/*                src={comment.user.avatar}*/}
                {/*            />*/}
                {/*        ) : null}*/}
                {/*        <Text*/}
                {/*            text={comment.user.firstName}*/}
                {/*            bold*/}
                {/*        />*/}
                {/*    </HStack>*/}
                {/*</AppLink>*/}
                <Text text={feedback.content} />
            </VStack>
        </Card>
    );
});
