import { buildSelector } from '@/shared/libs/store';
import { UserSettingsI } from '../../types/user.interface';

const defaultUserSettings: UserSettingsI = {};

export const [useUserSettings, getUserSettings] = buildSelector(
    (state) => defaultUserSettings,
);
