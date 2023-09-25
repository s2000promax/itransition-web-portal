import React, { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './MobileControlPanel.module.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/UI-kit/Input';
import { Icon } from '@/shared/UI-kit/Icon';
import SearchIcon from '@/shared/assets/ui/icons/search.svg';
import { HStack } from '@/shared/UI-kit/Stack';
import { useReviewFilters } from '@/features/ReviewListPage';
import { ColorThemeSwitcherDropdown } from '@/features/UI/ColorThemeSwitcherDropdown';
import { LanguageDropdown } from '@/features/UI/LanguageDropdown';

interface MobileControlPanelProps {
    className?: string;
}

export const MobileControlPanel = memo((props: MobileControlPanelProps) => {
    const { className } = props;
    const { t } = useTranslation('reviewList');
    const { onChangeSearch, search } = useReviewFilters();

    return (
        <div className={classNames(cls.MobileControlPanel, {}, [className])}>
            <HStack
                gap="32"
                justify="center"
            >
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    size="s"
                    placeholder={t('search')}
                    addonLeft={<Icon Svg={SearchIcon} />}
                />
                <HStack
                    gap="24"
                    align="center"
                >
                    <ColorThemeSwitcherDropdown isMobile />
                    <LanguageDropdown isMobile />
                </HStack>
            </HStack>
        </div>
    );
});
