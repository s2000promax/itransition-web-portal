import { WorkTypeEnums } from '@/entities/Work';
import { LanguageEnums } from '@/shared/enums/language.enums';
import { ThemeEnums } from '@/shared/enums/theme.enums';
import { SortOrderT } from '@/shared/types/sort.type';
import { SortFieldEnums } from '../enums/sortField.enums';
import { ViewEnums } from '../enums/view.enums';

export type ScrollSchemaT = Record<string, number>;

export interface UIEntityViewI {
    // pagination
    page: number;
    limit: number;
    hasMore: boolean;

    // filters
    view: ViewEnums;
    order: SortOrderT;
    search: string;
    type: WorkTypeEnums;
}

export interface UISchemaI {
    scroll: ScrollSchemaT;
    language: LanguageEnums;
    theme: ThemeEnums;
}
