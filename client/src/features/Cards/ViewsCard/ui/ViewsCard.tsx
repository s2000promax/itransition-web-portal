import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ViewsCard.module.scss';
import { Icon } from '@/shared/UI-kit/Icon';
import EyeIcon from '@/shared/assets/ui/icons/eye.svg';
import { Text } from '@/shared/UI-kit/Text';
import { HStack } from '@/shared/UI-kit/Stack';
import { ReviewI } from '@/entities/Review';

interface ViewsCardProps {
    className?: string;
    review?: ReviewI;
}

export const ViewsCard = memo((props: ViewsCardProps) => {
    const { className, review } = props;

    if (review) {
        return (
            <HStack
                gap="8"
                className={classNames(cls.ViewsCard, {}, [className])}
            >
                <Icon Svg={EyeIcon} />
                <Text text={String(review.viewCounter ?? 0)} />
            </HStack>
        );
    } else {
        return null;
    }
});
