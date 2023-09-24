import React, { HTMLAttributeAnchorTarget } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './WorkInfoCard.module.scss';
import { getRouteWorkDetails } from '@/shared/routes/routes.patterns';
import { Card } from '@/shared/UI-kit/Card';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';
import { AppLink } from '@/shared/UI-kit/AppLink';
import { WorkI } from '@/entities/Work';
import { useTranslation } from 'react-i18next';
import { roundedFloat } from '@/shared/libs/roundedFloat/roundedFloat';

interface WorkInfoCardProps {
    className?: string;
    work?: WorkI;
    target?: HTMLAttributeAnchorTarget;
}

export const WorkInfoCard = (props: WorkInfoCardProps) => {
    const { className, work, target } = props;
    const { t } = useTranslation('work');

    if (work) {
        return (
            <AppLink
                data-testid="WorkInfoCard"
                target={target}
                to={getRouteWorkDetails(work.id!)}
                className={classNames(cls.WorkInfoCard, {}, [className])}
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
                                height={140}
                            />
                        }
                        alt={work.title}
                        src={work.cover}
                        className={cls.img}
                    />
                    <VStack
                        className={cls.info}
                        gap="4"
                        max
                        justify="between"
                    >
                        <VStack gap="4">
                            <Text
                                title={work.title}
                                bold
                            />
                            <Text
                                text={work.author}
                                bold
                            />
                            <Text text={DateFormatter(work.releaseDate!)} />
                        </VStack>
                        <VStack gap="8">
                            <Text
                                text={`${t(
                                    'averageReviewsRating',
                                )}: ${roundedFloat(work.averageReviewsRating)}`}
                            />
                            <Text
                                text={`${t(
                                    'averageUsersRating',
                                )}: ${roundedFloat(work.averageUsersRating)}`}
                            />
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
