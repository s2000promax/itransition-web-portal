import { LocalStorageEnums } from '@/shared/enums/localStorage.enums';

export const PersistenceService = {
    set: (key: LocalStorageEnums, data: any): void => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to localStorage', e);
        }
    },

    get: (key: LocalStorageEnums): any => {
        try {
            return JSON.parse(localStorage.getItem(key) as string);
        } catch (e) {
            console.error('Error getting data from localStorage', e);
            return null;
        }
    },

    removeKey: (key: LocalStorageEnums): void => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing to localStorage', e);
        }
    },
};
