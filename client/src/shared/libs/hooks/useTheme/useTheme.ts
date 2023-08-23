import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { ThemeEnums } from '../../../enums/theme.enums';

interface UseThemeResult {
    toggleTheme: (saveAction?: (theme: ThemeEnums) => void) => void;
    theme: ThemeEnums;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (saveAction?: (theme: ThemeEnums) => void) => {
        let newTheme: ThemeEnums;
        switch (theme) {
        case ThemeEnums.DARK:
            newTheme = ThemeEnums.LIGHT;
            break;
        case ThemeEnums.LIGHT:
            newTheme = ThemeEnums.SAND;
            break;
        case ThemeEnums.SAND:
            newTheme = ThemeEnums.DARK;
            break;
        default:
            newTheme = ThemeEnums.LIGHT;
        }
        setTheme?.(newTheme);

        saveAction?.(newTheme);
    };

    return {
        theme: theme || ThemeEnums.LIGHT,
        toggleTheme,
    };
}
