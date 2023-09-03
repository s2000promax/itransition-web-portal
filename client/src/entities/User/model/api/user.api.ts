import { rtkApi } from '@/shared/api/rtk.api';
import { UserI, UserSettingsI } from '../types/user.interface';

interface SetUserSettingsArg {
    userId: string;
    userSettings: UserSettingsI;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<UserI, SetUserSettingsArg>({
            query: ({ userId, userSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    userSettings,
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
    userApi.endpoints.setJsonSettings.initiate;

export const getUserDataQuery = userApi.endpoints.getUserData.initiate;
