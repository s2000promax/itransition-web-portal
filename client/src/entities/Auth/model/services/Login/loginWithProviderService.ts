import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions, UserI } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { authActions, AuthSchemaI } from '@/entities/Auth';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';
import { initUserDataService } from '@/entities/User/model/services/initUserData.service';
import { ProviderEnums } from '@/shared/enums/provider.enums';

type argsT = {
    token: string;
    provider: ProviderEnums;
};

export const loginWithProviderService = createAsyncThunk<
    AuthSchemaI,
    argsT,
    ThunkConfig<string>
>('login/loginWithProvider', async (args, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    let response;

    try {
        switch (args.provider) {
            case ProviderEnums.GOOGLE:
                response = await extra.api.get(
                    `auth/success-${ProviderEnums.GOOGLE}`,
                    {
                        params: {
                            token: args.token,
                        },
                    },
                );
                break;
            case ProviderEnums.FACEBOOK:
                response = await extra.api.get(
                    `auth/success-${ProviderEnums.FACEBOOK}`,
                    {
                        params: {
                            token: args.token,
                        },
                    },
                );
                break;
            case ProviderEnums.YANDEX:
                response = await extra.api.get(
                    `auth/success-${ProviderEnums.YANDEX}`,
                    {
                        params: {
                            token: args.token,
                        },
                    },
                );
                break;
        }

        if (response.status !== 201) {
            return rejectWithValue('error');
        }

        PersistenceService.set(
            LocalStorageEnums.TOKEN,
            response.data.accessToken,
        );

        dispatch(authActions.setAuthData(response.data));

        dispatch(initUserDataService());

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
