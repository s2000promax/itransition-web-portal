import React, { memo } from 'react';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvg from '@/shared/assets/uiicons/app-image.svg';
import { classNames } from '@/shared/libs/classNames/classNames';

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
        <AppSvg
            width={2 * size}
            height={size}
            color="black"
            className={cls.appLogo}
        />
        <div className={cls.gradientBig} />
        <div className={cls.gradientSmall} />
    </HStack>
));
