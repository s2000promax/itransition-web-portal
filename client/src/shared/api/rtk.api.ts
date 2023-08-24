import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {
            const token =
                (PersistenceService.get(LocalStorageEnums.USER) as string) ||
                '';
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
