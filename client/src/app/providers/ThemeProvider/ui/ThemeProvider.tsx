import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from '@/shared/libs/context/ThemeContext';
import { ThemeEnums } from '@/shared/enums/theme.enums';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

interface ThemeProviderProps {
    initialTheme?: ThemeEnums;
    children: ReactNode;
}

const fallbackTheme = PersistenceService.get(
    LocalStorageEnums.THEME,
) as ThemeEnums;

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;
    const [isThemeInited, setThemeInited] = useState(false);

    const [theme, setTheme] = useState<ThemeEnums>(
        initialTheme || fallbackTheme || ThemeEnums.LIGHT,
    );

    useEffect(() => {
        if (!isThemeInited && initialTheme) {
            setTheme(initialTheme);
            setThemeInited(true);
        }
    }, [initialTheme, isThemeInited]);

    useEffect(() => {
        document.body.className = theme;
        PersistenceService.set(LocalStorageEnums.THEME, theme);
    }, [theme]);

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
