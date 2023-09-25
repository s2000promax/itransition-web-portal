import { rtkApi } from '@/shared/api/rtk.api';
import { NotificationI } from '../types/notification.interface';
import { LanguageEnums } from '@/shared/enums/language.enums';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<NotificationI[], LanguageEnums>({
            query: (currentLanguage: LanguageEnums) => ({
                url: '/notifications',
                params: {
                    _lang: currentLanguage,
                },
            }),
        }),
    }),
});

export const useNotifications = notificationApi.useGetNotificationsQuery;
