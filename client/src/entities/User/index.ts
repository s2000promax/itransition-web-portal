export type {
    UserI,
    UserSchemaI,
    UserSettingsI,
} from './model/types/user.interface';

export { getUserInited } from './model/selectors/getUserInited.selector';
export { getUserAuthData } from './model/selectors/getUserAuthData.selector';
export {
    getUserSettings,
    useUserSettings,
} from './model/selectors/getUserSettings.selector';
export {
    getUserRoles,
    isUserRoleAdmin,
    isUserRoleUser,
} from './model/selectors/getUserRoles.selector';

export { userReducer, userActions } from './model/slice/user.slice';

export { initAuthData, saveUserSettings } from './model/services/user.service';

export { UserRolesEnums } from './model/enums/userRoles.enums';
