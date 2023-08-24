export type { LoginSchemaI } from './model/types/login.interface';

export { getLoginIsLoading } from './model/selectors/getLoginIsLoading.selector';
export { getLoginUsername } from './model/selectors/getLoginUsername.selector';
export { getLoginPassword } from './model/selectors/getLoginPassword.selector';
export { getLoginError } from './model/selectors/getLoginError.selector';

export { loginReducer, loginActions } from './model/slice/login.slice';
