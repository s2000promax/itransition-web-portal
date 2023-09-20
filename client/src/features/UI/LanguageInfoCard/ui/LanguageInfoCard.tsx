import React, { memo, Suspense } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useSelector } from 'react-redux';
import { getLanguageSelector } from '@/entities/UI/UI';
import { HStack } from '@/shared/UI-kit/Stack';
import { Icon } from '@/shared/UI-kit/Icon';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { LanguageEnums } from '@/shared/enums/language.enums';

interface LanguageInfoCardProps {
    className?: string;
}

export const LanguageInfoCard = memo((props: LanguageInfoCardProps) => {
    const { className } = props;
    const currentLanguage =
        useSelector(getLanguageSelector) ?? LanguageEnums.ENG;

    const LanguageIcon = React.lazy(
        () =>
            import(`@/shared/assets/ui/icons/languages/${currentLanguage}.svg`),
    );

    return (
        <HStack className={classNames('', {}, [className])}>
            <Suspense
                fallback={
                    <Skeleton
                        width={24}
                        height={18}
                    />
                }
            >
                <Icon
                    Svg={LanguageIcon}
                    width={24}
                    height={18}
                    clickable={false}
                />
            </Suspense>
        </HStack>
    );
});
