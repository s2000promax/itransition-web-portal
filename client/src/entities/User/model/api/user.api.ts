import { rtkApi } from '@/shared/api/rtk.api';
import { UserI, UserSettingsI } from '../types/user.interface';

interface SetUserSettingsArg {
    userId: string;
    userSettings: UserSettingsI;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setUserSettings: build.mutation<UserI, SetUserSettingsArg>({
            query: ({ userId, userSettings }) => ({
                url: `user/${userId}`,
                method: 'PATCH',
                body: {
                    ...userSettings,
                },
            }),
        }),
        getUserData: build.query<UserI, void>({
            query: () => ({
                url: 'user/me',
                method: 'GET',
            }),
        }),
    }),
});

export const setUserSettingsMutation =
    userApi.endpoints.setUserSettings.initiate;

export const getUserDataQuery = userApi.endpoints.getUserData.initiate;
