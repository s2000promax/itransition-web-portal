import { UserRolesEnums } from '@/entities/User';
import { ThemeEnums } from '@/shared/enums/theme.enums';
import { LanguageEnums } from '@/shared/enums/language.enums';

export interface UserSettingsI {
    theme: ThemeEnums;
    language: LanguageEnums;
    isFirstVisit: boolean;
    isReviewsPageWasOpened: boolean;
}

export interface UserI {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    roles: UserRolesEnums[];
    settings: UserSettingsI;
    userSettings: UserSettingsI;
}

export interface UserSchemaI {
    userData: UserI | null;
    _inited: boolean;
    isLoading: boolean;
    error?: string;
}
