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
        getUserDataById: build.query<UserI, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const setUserSettingsMutation =
    userApi.endpoints.setJsonSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
