import { createContext } from 'react';
import { ThemeEnums } from '@/shared/enums/theme.enums';

export interface ThemeContextProps {
    theme?: ThemeEnums;
    setTheme?: (theme: ThemeEnums) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});
