export type { AuthSchemaI } from './model/types/auth.interface';

export {
    getAuthDataSelector,
    getAccessToken,
} from './model/selectors/Auth/getAuthData/getAuthData.selector';

export { authReducer, authActions } from './model/slice/Auth/auth.slice';

export { removeAuthData } from './model/services/Auth/auth.service';

export type { RegisterSchemaI } from './model/types/register.interface';

export { getRegisterFirstNameSelector } from './model/selectors/Register/getRegisterFirstName/getRegisterFirstName.selector';
export { getRegisterLastNameSelector } from './model/selectors/Register/getRegisterLastName/getRegisterLastName.selector';
export { getRegisterEmailSelector } from './model/selectors/Register/getRegisterEmail/getRegisterEmail.selector';
export { getRegisterPasswordSelector } from './model/selectors/Register/getRegisterPassword/getRegisterPassword.selector';
export { getRegisterIsLoadingSelector } from './model/selectors/Register/getRegisterIsLoading/getRegisterIsLoading.selector';
export { getRegisterErrorSelector } from './model/selectors/Register/getRegisterError/getRegisterError.selector';
export { getRegisterIsFormValidSelector } from './model/selectors/Register/getRegisterIsFormValid/getRegisterIsFormValid.selector';

export {
    registerReducer,
    registerActions,
} from './model/slice/Register/register.slice';

export type { LoginSchemaI } from './model/types/login.interface';

export { getLoginEmailSelector } from './model/selectors/Login/getLoginEmail/getLoginEmail.selector';
export { getLoginPasswordSelector } from './model/selectors/Login/getLoginPassword/getLoginPassword.selector';
export { getLoginIsLoadingSelector } from './model/selectors/Login/getLoginIsLoading/getLoginIsLoading.selector';
export { getLoginErrorSelector } from './model/selectors/Login/getLoginError/getLoginError.selector';
export { getLoginIsFormValidSelector } from './model/selectors/Login/getLoginIsFormValid/getLoginIsFormValid.selector';

export { loginReducer, loginActions } from './model/slice/Login/login.slice';

export { loginByEmail } from './model/services/Login/login.service';
export { loginWithProviderService } from './model/services/Login/loginWithProviderService';
export { register } from './model/services/Register/register.service';
