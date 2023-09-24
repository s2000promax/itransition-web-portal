import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ReviewListItem.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { Card } from '@/shared/UI-kit/Card';
import { Avatar } from '@/shared/UI-kit/Avatar';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { AppLink } from '@/shared/UI-kit/AppLink';
import { Button } from '@/shared/UI-kit/Button';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Icon } from '@/shared/UI-kit/Icon';
import {
    ReviewI,
    ReviewTextBlockI,
    ReviewBlockTypeEnums,
} from '@/entities/Review';
import { getRouteReviewDetails } from '@/shared/routes/routes.patterns';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';
import EyeIcon from '@/shared/assets/ui/icons/eye.svg';
import { ViewEnums } from '@/entities/UI/UI';

interface ReviewItemProps {
    className?: string;
    review: ReviewI;
    view: ViewEnums;
    target?: HTMLAttributeAnchorTarget;
}

export const ReviewListItem = memo((props: ReviewItemProps) => {
    const { className, review, view, target } = props;
    const { t } = useTranslation('reviewList');

    const userInfo = (
        <HStack gap="8">
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
    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text
                text={String(review.viewCounter ?? 0)}
                className={cls.views}
            />
        </HStack>
    );

    if (view === ViewEnums.BIG) {
        const textBlock = review.blocks.find(
            (block) => block.type === ReviewBlockTypeEnums.TEXT,
        ) as ReviewTextBlockI;

        return (
            <Card
                padding="24"
                data-testid="ReviewListItem"
                className={classNames('', {}, [className, cls[view]])}
            >
                <VStack
                    max
                    className={cls.container}
                    justify="between"
                >
                    <VStack
                        gap="8"
                        max
                    >
                        {userInfo}
                        <Text
                            title={review.title}
                            bold
                            className={cls.title}
                        />
                        <Text
                            title={review.workTitle}
                            size="s"
                            bold
                        />
                        <AppImage
                            fallback={
                                <Skeleton
                                    width="100%"
                                    height={250}
                                />
                            }
                            src={review.cover}
                            className={cls.img}
                            alt={review.title}
                        />
                        {textBlock?.paragraphs && (
                            <Text
                                className={cls.textBlock}
                                text={textBlock.paragraphs
                                    .slice(0, 2)
                                    .map((p) => p.content)
                                    .join(' ')}
                            />
                        )}
                    </VStack>
                    <HStack
                        max
                        justify="between"
                    >
                        <AppLink
                            target={target}
                            to={getRouteReviewDetails(review.id)}
                        >
                            <Button variant="outline">{t('more')}</Button>
                        </AppLink>
                        {views}
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <AppLink
            data-testid="ReviewListItem"
            target={target}
            to={getRouteReviewDetails(review.id)}
            className={classNames(cls.ReviewListItem, {}, [
                className,
                cls[view],
            ])}
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
                            {views}
                        </HStack>
                        <HStack gap="4">{userInfo}</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
