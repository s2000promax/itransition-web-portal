import { LanguageEnums } from '@/shared/enums/language.enums';
import { ThemeEnums } from '@/shared/enums/theme.enums';

export type ScrollSchemaT = Record<string, number>;

export interface UISchemaI {
    scroll: ScrollSchemaT;
    language: LanguageEnums;
    theme: ThemeEnums;
}
