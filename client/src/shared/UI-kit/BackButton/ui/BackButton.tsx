import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './BackButton.module.scss';
import BackIcon from '@/shared/assets/ui/icons/back.svg';
import { Icon } from '../../Icon';
import { HStack } from '@/shared/UI-kit/Stack';

interface BackButtonProps {
    className?: string;
    onBack?: () => void;
}

export const BackButton = memo((props: BackButtonProps) => {
    const { className, onBack } = props;

    const onClick = () => () => {
        if (onBack) {
            onBack();
        } else {
            window.history.back();
        }
    };

    const commonProps = {
        className: classNames(cls.icon, {}, []),
        Svg: BackIcon,

        width: 26,
        height: 24,
        onClick: onClick(),
    };

    return (
        <HStack className={classNames(cls.BackButton, {}, [className])}>
            <Icon
                clickable={true}
                {...commonProps}
            />
        </HStack>
    );
});
