import axios from 'axios';
import { PersistenceService } from '@/shared/services/persistence.service';
import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

export const $api = axios.create({
    baseURL: __API__,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization =
            (PersistenceService.get(LocalStorageEnums.TOKEN) as string) || '';
        config.headers['Accept'] = 'application/json';

        if (config.data instanceof FormData) {
            if (config.data.has('file')) {
                config.headers['Content-Type'] = 'multipart/form-data';
            }
        } else {
            config.headers['Content-Type'] = 'application/json';
        }
    }
    return config;
});
