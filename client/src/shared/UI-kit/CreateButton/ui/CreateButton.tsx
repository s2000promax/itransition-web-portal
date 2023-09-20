import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './CreateButton.module.scss';
import CreateIcon from '@/shared/assets/ui/icons/create-review.svg';
import { Icon } from '../../Icon';
import { HStack } from '@/shared/UI-kit/Stack';

interface CreateReviewButtonProps {
    className?: string;
    onCreate?: () => void;
}

export const CreateButton = memo((props: CreateReviewButtonProps) => {
    const { className, onCreate } = props;

    const onClick = () => () => {
        if (onCreate) {
            onCreate();
        }
    };

    const commonProps = {
        className: classNames(cls.icon, {}, []),
        Svg: CreateIcon,

        width: 24,
        height: 24,
        onClick: onClick(),
    };

    return (
        <HStack className={classNames(cls.CreateButton, {}, [className])}>
            <Icon
                clickable={true}
                {...commonProps}
            />
        </HStack>
    );
});
