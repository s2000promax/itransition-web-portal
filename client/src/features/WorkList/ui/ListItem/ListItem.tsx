import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ListItem.module.scss';
import { Text } from '@/shared/UI-kit/Text';
import { Card } from '@/shared/UI-kit/Card';
import { AppImage } from '@/shared/UI-kit/AppImage';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { AppLink } from '@/shared/UI-kit/AppLink';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import { ReviewViewEnums } from '@/entities/Review';
import { getRouteWorkDetails } from '@/shared/routes/routes.patterns';
import { WorkI } from '@/entities/Work';
import { DateFormatter } from '@/shared/libs/dateFormetter/dateFormatter';
import { WorkInfoCard } from '@/features/WorkInfoCard';

interface ListItemProps {
    className?: string;
    work?: WorkI;
    view: ReviewViewEnums;
    target?: HTMLAttributeAnchorTarget;
}

export const ListItem = memo((props: ListItemProps) => {
    const { className, work, view, target } = props;

    return (
        <WorkInfoCard
            work={work}
            className={className}
        />
    );
});
