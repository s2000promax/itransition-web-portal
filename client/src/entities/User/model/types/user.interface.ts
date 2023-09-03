import { UserRolesEnums } from '@/entities/User';
import { ThemeEnums } from '@/shared/enums/theme.enums';

export interface UserSettingsI {
    theme?: ThemeEnums;
    isFirstVisit?: boolean;
    isReviewsPageWasOpened?: boolean;
}

export interface UserI {
    id: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role?: UserRolesEnums[];
    isBlocked?: boolean;
    settings?: number;
    accessToken?: string;
    userSettings?: UserSettingsI;
}

export interface UserSchemaI {
    userData?: UserI;
    _inited: boolean;
}
