import React, { memo, Suspense } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useSelector } from 'react-redux';
import { getColorThemeSelector } from '@/entities/UI/UI';
import { HStack } from '@/shared/UI-kit/Stack';
import { Icon } from '@/shared/UI-kit/Icon';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { ThemeEnums } from '@/shared/enums/theme.enums';

interface LanguageInfoCardProps {
    className?: string;
}

export const ColorThemeInfoCard = memo((props: LanguageInfoCardProps) => {
    const { className } = props;
    const currentColorTheme =
        useSelector(getColorThemeSelector) ?? ThemeEnums.LIGHT;

    const ColorThemeIcon = React.lazy(
        () => import(`@/shared/assets/ui/icons/theme/${currentColorTheme}.svg`),
    );

    return (
        <HStack className={classNames('', {}, [className])}>
            <Suspense
                fallback={
                    <Skeleton
                        width={24}
                        height={24}
                    />
                }
            >
                <Icon
                    Svg={ColorThemeIcon}
                    width={24}
                    height={24}
                    clickable={false}
                />
            </Suspense>
        </HStack>
    );
});
