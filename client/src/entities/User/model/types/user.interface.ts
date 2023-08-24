import { UserRolesEnums } from '@/entities/User';
import { ThemeEnums } from '@/shared/enums/theme.enums';

export interface UserSettingsI {
    theme?: ThemeEnums;
    isFirstVisit?: boolean;
    isArticlesPageWasOpened?: boolean;
}

export interface UserI {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRolesEnums[];
    userSettings?: UserSettingsI;
}

export interface UserSchemaI {
    authData?: UserI;
    _inited: boolean;
}
