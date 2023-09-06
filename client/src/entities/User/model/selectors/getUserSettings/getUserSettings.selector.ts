import { buildSelector } from '@/shared/libs/store';
import { UserSettingsI } from '../../types/user.interface';
import { ThemeEnums } from '@/shared/enums/theme.enums';
import { LanguageEnums } from '@/shared/enums/language.enums';

const defaultUserSettings: UserSettingsI = {
    isFirstVisit: true,
    theme: ThemeEnums.LIGHT,
    language: LanguageEnums.ENG,
    isReviewsPageWasOpened: false,
};

export const [useUserSettings, getUserSettings] = buildSelector(
    (state) => state.user.userData?.userSettings || defaultUserSettings,
);
