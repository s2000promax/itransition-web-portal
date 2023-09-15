export type { UISchemaI, ScrollSchemaT } from './model/types/ui.interface';

export { getUIScrollByPath } from './model/selectors/getUIScroll/ui.selector';
export { getLanguageSelector } from './model/selectors/getLanguage/getLanguage.selector';
export { getColorThemeSelector } from './model/selectors/getColorTheme/getColorThemeSelector';

export { uiReducer, uiActions } from './model/slices/ui.slice';

export { languageChangeService } from './model/services/languageChange/languageChange.service';
