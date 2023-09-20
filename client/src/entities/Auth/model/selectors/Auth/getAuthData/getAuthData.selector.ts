import { StateSchemaI } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/libs/store';

export const getAuthDataSelector = (state: StateSchemaI) =>
    state?.authData?.accessToken;

export const [useAuthData, getAccessToken] = buildSelector(
    (state) => state?.authData?.accessToken,
);
