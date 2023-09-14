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
import {
    getRouteReviewDetails,
    getRouteWorkDetails,
    getRouteWorkEdit,
} from '@/shared/routes/routes.patterns';
import { WorkI } from '@/entities/Work';

interface ListItemProps {
    className?: string;
    work: WorkI;
    view: ReviewViewEnums;
    target?: HTMLAttributeAnchorTarget;
}

export const ListItem = memo((props: ListItemProps) => {
    const { className, work, view, target } = props;
    const { t } = useTranslation('work');

    return (
        <AppLink
            data-testid="WorkListItem"
            target={target}
            to={getRouteWorkDetails(work.id!)}
            className={classNames(cls.WorkListItem, {}, [className, cls[view]])}
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
                    alt={work.title}
                    src={work.cover}
                    className={cls.img}
                />
                <VStack
                    className={cls.info}
                    gap="4"
                >
                    <Text
                        title={work.title}
                        className={cls.title}
                    />
                    <VStack
                        gap="4"
                        className={cls.footer}
                        max
                    >
                        <HStack gap="4">{work.description}</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
