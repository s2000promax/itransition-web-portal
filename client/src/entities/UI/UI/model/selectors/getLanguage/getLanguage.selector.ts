import { StateSchemaI } from '@/app/providers/StoreProvider';

export const getLanguageSelector = (state: StateSchemaI) => state.ui.language;
