import React, { memo, useCallback, useContext } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Dropdown } from '@/shared/UI-kit/Popups';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { colorThemeChangeService } from '@/entities/UI/UI';
import { ThemeEnums } from '@/shared/enums/theme.enums';
import { ColorThemeInfoCard } from '@/features/UI/ColorThemeInfoCard';
import { ThemeContext } from '@/shared/libs/context/ThemeContext';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

interface ColorThemeSwitcherDropdownProps {
    className?: string;
}

export const ColorThemeSwitcherDropdown = memo(
    (props: ColorThemeSwitcherDropdownProps) => {
        const { className } = props;
        const { t } = useTranslation('theme');
        const dispatch = useAppDispatch();
        const { theme, setTheme } = useContext(ThemeContext);

        useInitialEffect(() => {
            const localTheme = PersistenceService.get(LocalStorageEnums.THEME);
            if (localTheme) {
                dispatch(colorThemeChangeService(localTheme));
            }
        });

        const onColorThemeChange = useCallback(
            (newTheme: ThemeEnums) => {
                setTheme?.(newTheme);
                dispatch(colorThemeChangeService(newTheme));
            },
            [dispatch],
        );

        const items = [
            {
                content: t('light'),
                onClick: () => onColorThemeChange(ThemeEnums.LIGHT),
            },
            {
                content: t('dark'),
                onClick: () => onColorThemeChange(ThemeEnums.DARK),
            },
            {
                content: t('sand'),
                onClick: () => onColorThemeChange(ThemeEnums.SAND),
            },
        ];

        return (
            <Dropdown
                direction="top right"
                className={classNames('', {}, [className])}
                items={items}
                trigger={<ColorThemeInfoCard />}
            />
        );
    },
);
