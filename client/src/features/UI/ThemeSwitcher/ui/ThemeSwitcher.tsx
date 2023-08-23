import React, { memo, useCallback } from 'react';
import { useTheme } from '@/shared/libs/hooks/useTheme/useTheme';
import { Icon } from '@/shared/UI-kit/Icon';
import ThemeIcon from '@/shared/assets/ui/icons/theme.svg';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            console.log(newTheme);
        });
    }, [toggleTheme]);

    return (
        <Icon
            Svg={ThemeIcon}
            clickable
            onClick={onToggleHandler}
        />
    );
});
