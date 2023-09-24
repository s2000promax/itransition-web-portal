import { HTMLAttributeAnchorTarget, memo } from 'react';
import { WorkI } from '@/entities/Work';
import { WorkInfoCard } from '@/features/Cards/WorkInfoCard';
import { ViewEnums } from '@/entities/UI/UI';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './WorkListItem.module.scss';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { AppLink } from '@/shared/UI-kit/AppLink';
import { getRouteWorkDetails } from '@/shared/routes/routes.patterns';
import { Button } from '@/shared/UI-kit/Button';
import { Card } from '@/shared/UI-kit/Card';
import { useTranslation } from 'react-i18next';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';

interface ListItemProps {
    className?: string;
    work?: WorkI;
    view: ViewEnums;
    target?: HTMLAttributeAnchorTarget;
}

export const WorkListItem = memo((props: ListItemProps) => {
    const { className, work, view, target } = props;
    const { t } = useTranslation('workList');

    if (view === ViewEnums.BIG) {
        return (
            <Card
                padding="24"
                data-testid="WorkListItem"
                className={classNames('', {}, [className, cls[view]])}
            >
                <VStack
                    max
                    gap="16"
                    justify="between"
                    className={cls.container}
                >
                    <VStack
                        gap="8"
                        max
                    >
                        <Text
                            title={work?.title}
                            bold
                        />
                        <HStack gap="8">
                            <Text
                                title={work?.author}
                                size="s"
                                bold
                            />
                            <Text text={DateFormatter(work?.releaseDate!)} />
                        </HStack>
                        <AppImage
                            fallback={
                                <Skeleton
                                    width="100%"
                                    height={250}
                                />
                            }
                            src={work?.cover}
                            className={cls.img}
                            alt={work?.title}
                        />

                        <Text
                            className={cls.textBlock}
                            text={work?.description}
                        />
                    </VStack>

                    <HStack
                        max
                        justify="between"
                    >
                        <AppLink
                            target={target}
                            to={getRouteWorkDetails(work?.id!)}
                        >
                            <Button variant="outline">{t('more')}</Button>
                        </AppLink>
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <WorkInfoCard
            work={work}
            className={className}
        />
    );
});
