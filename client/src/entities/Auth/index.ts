export type { AuthSchemaI } from './model/types/auth.interface';

export {
    getAuthDataSelector,
    getAccessToken,
} from './model/selectors/Auth/getAuthData/getAuthData.selector';

export { authReducer, authActions } from './model/slice/auth.slice';

export type { RegisterSchemaI } from './model/types/register.interface';

export { getRegisterFirstNameSelector } from './model/selectors/Register/getRegisterFirstName/getRegisterFirstName.selector';
export { getRegisterLastNameSelector } from './model/selectors/Register/getRegisterLastName/getRegisterLastName.selector';
export { getRegisterEmailSelector } from './model/selectors/Register/getRegisterEmail/getRegisterEmail.selector';
export { getRegisterPasswordSelector } from './model/selectors/Register/getRegisterPassword/getRegisterPassword.selector';
export { getRegisterIsLoadingSelector } from './model/selectors/Register/getRegisterIsLoading/getRegisterIsLoading.selector';
export { getRegisterErrorSelector } from './model/selectors/Register/getRegisterError/getRegisterError.selector';

export { registerReducer, registerActions } from './model/slice/register.slice';

export type { LoginSchemaI } from './model/types/login.interface';

export { getLoginEmailSelector } from '@/entities/Auth/model/selectors/Login/getLoginEmail/getLoginEmail.selector';
export { getLoginPasswordSelector } from './model/selectors/Login/getLoginPassword/getLoginPassword.selector';
export { getLoginIsLoadingSelector } from './model/selectors/Login/getLoginIsLoading/getLoginIsLoading.selector';
export { getLoginErrorSelector } from './model/selectors/Login/getLoginError/getLoginError.selector';

export { loginReducer, loginActions } from './model/slice/login.slice';

export { loginByEmail } from './model/services/login.service';
