import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ListItem.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { Card } from '@/shared/UI-kit/Card';
import { Avatar } from '@/shared/UI-kit/Avatar';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { AppLink } from '@/shared/UI-kit/AppLink';
import { Button } from '@/shared/UI-kit/Button';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Icon } from '@/shared/UI-kit/Icon';
import EyeIcon from '@/shared/assets/ui/icons/eye.svg';
import {
    ReviewI,
    ReviewViewEnums,
    ReviewTextBlockI,
    ReviewBlockTypeEnums,
} from '@/entities/Review';
import { getRouteReviewDetails } from '@/shared/routes/routes.patterns';

interface ListItemProps {
    className?: string;
    review: ReviewI;
    view: ReviewViewEnums;
    target?: HTMLAttributeAnchorTarget;
}

export const ListItem = memo((props: ListItemProps) => {
    const { className, review, view, target } = props;
    const { t } = useTranslation('review_list');

    const userInfo = (
        <>
            <Avatar
                size={32}
                src={review.user?.avatar}
                className={cls.avatar}
            />
            <Text
                bold
                text={review.user?.email || 'userEmail'}
            />
        </>
    );
    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text
                text={String(review.viewCount)}
                className={cls.views}
            />
        </HStack>
    );

    if (view === ReviewViewEnums.BIG) {
        const textBlock = review.blocks.find(
            (block) => block.type === ReviewBlockTypeEnums.TEXT,
        ) as ReviewTextBlockI;

        return (
            <Card
                padding="24"
                fullWidth
                data-testid="ReviewListItem"
                className={classNames(cls.ReviewListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <VStack
                    max
                    gap="16"
                >
                    <HStack
                        gap="8"
                        max
                    >
                        {userInfo}
                        <Text
                            // text={review.createdAt.toDateString()}
                            text={'Data User info'}
                        />
                    </HStack>
                    <Text
                        title={review.title}
                        bold
                    />
                    <Text
                        title={review.workTitle}
                        size="s"
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
                            text={textBlock.paragraphs.slice(0, 2).join(' ')}
                        />
                    )}
                    <HStack
                        max
                        justify="between"
                    >
                        <AppLink
                            target={target}
                            to={getRouteReviewDetails(review.id)}
                        >
                            <Button variant="outline">{t('read_more')}</Button>
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
                        className={cls.title}
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
                            <Text
                                // text={review.createdAt.toDateString()}
                                text={'Data'}
                                className={cls.date}
                            />
                            {views}
                        </HStack>
                        <HStack gap="4">{userInfo}</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
