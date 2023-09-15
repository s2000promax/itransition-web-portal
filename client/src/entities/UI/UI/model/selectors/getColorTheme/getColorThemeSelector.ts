import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getColorThemeSelector = (state: StateSchemaI) => state.ui.theme;
