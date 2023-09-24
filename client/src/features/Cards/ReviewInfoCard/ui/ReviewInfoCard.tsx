import React, { HTMLAttributeAnchorTarget } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ReviewInfoCard.module.scss';
import {
    getRouteReviewDetails,
    getRouteWorkDetails,
} from '@/shared/routes/routes.patterns';
import { Card } from '@/shared/UI-kit/Card';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';
import { AppLink } from '@/shared/UI-kit/AppLink';
import { WorkI } from '@/entities/Work';
import { useTranslation } from 'react-i18next';
import { roundedFloat } from '@/shared/libs/roundedFloat/roundedFloat';
import { ReviewI } from '@/entities/Review';
import { ViewsCard } from '@/features/Cards/ViewsCard';
import { UserInfoCard } from '@/features/Cards/UserInfoCard';

interface ReviewInfoCardProps {
    className?: string;
    review?: ReviewI;
    target?: HTMLAttributeAnchorTarget;
}

export const ReviewInfoCard = (props: ReviewInfoCardProps) => {
    const { className, review, target } = props;
    const { t } = useTranslation('work');

    if (review) {
        return (
            <AppLink
                data-testid="ReviewListItem"
                target={target}
                to={getRouteReviewDetails(review.id)}
                className={classNames(cls.ReviewInfoCard, {}, [className])}
            >
                <Card
                    className={cls.card}
                    border="partial"
                    padding="0"
                >
                    <AppImage
                        fallback={
                            <Skeleton
                                width="100%"
                                height={200}
                            />
                        }
                        alt={review.title}
                        src={review.cover}
                        className={cls.img}
                    />
                    <VStack
                        className={cls.info}
                        gap="4"
                    >
                        <Text
                            title={review.title}
                            size="s"
                            bold
                        />
                        <VStack
                            gap="4"
                            className={cls.footer}
                            max
                        >
                            <HStack
                                justify="between"
                                max
                            >
                                <Text text={DateFormatter(review.createdAt)} />
                                <ViewsCard review={review} />
                            </HStack>
                            <HStack gap="4">
                                <UserInfoCard review={review} />
                            </HStack>
                        </VStack>
                    </VStack>
                </Card>
            </AppLink>
        );
    } else {
        return (
            <>
                <Skeleton
                    width="100%"
                    height={150}
                    border="32px"
                />
                <Skeleton
                    width={130}
                    height={16}
                />
                <Skeleton
                    width={150}
                    height={16}
                />
                <Skeleton
                    width={150}
                    height={16}
                />
                <Skeleton
                    width={150}
                    height={16}
                />
            </>
        );
    }
};
