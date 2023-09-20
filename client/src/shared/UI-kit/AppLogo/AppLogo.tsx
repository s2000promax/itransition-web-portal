import React, { memo } from 'react';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvg from '@/shared/assets/ui/icons/app-image.svg';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Icon } from '@/shared/UI-kit/Icon';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => (
    <HStack
        max
        justify="center"
        className={classNames(cls.appLogoWrapper, {}, [className])}
    >
        <Icon
            Svg={AppSvg}
            width={2 * size}
            height={size}
            className={cls.appLogo}
        />
        <div className={cls.gradientBig} />
        <div className={cls.gradientSmall} />
    </HStack>
));
