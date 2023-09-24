import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './FeedBackCard.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Card } from '@/shared/UI-kit/Card';
import { FeedbackI } from '@/entities/FeedBack';
import { getRouteProfile } from '@/shared/routes/routes.patterns';
import { Avatar } from '@/shared/UI-kit/Avatar';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';
import { AppLink } from '@/shared/UI-kit/AppLink';

interface FeedBackCardProps {
    className?: string;
    feedback?: FeedbackI;
    isLoading?: boolean;
}

export const FeedBackCard = memo((props: FeedBackCardProps) => {
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
                gap="16"
                max
                className={classNames(cls.FeedBackCard, {}, [className])}
            >
                <AppLink to={getRouteProfile(feedback?.user?.id!)}>
                    <HStack gap="8">
                        <Avatar
                            size={30}
                            src={feedback?.user?.avatar!}
                        />

                        <HStack gap="8">
                            <Text
                                text={feedback?.user?.firstName}
                                bold
                            />
                            <Text
                                text={feedback?.user?.lastName}
                                bold
                            />
                            <Text text={DateFormatter(feedback.createdAt!)} />
                        </HStack>
                    </HStack>
                </AppLink>
                <HStack
                    align="center"
                    gap="16"
                >
                    <Text
                        title={String(feedback.rate)}
                        className={cls.rating}
                    />

                    <Text text={feedback.feedback} />
                </HStack>
            </VStack>
        </Card>
    );
});
