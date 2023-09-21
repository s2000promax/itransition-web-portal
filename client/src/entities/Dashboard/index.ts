export type { DashboardSchemaI } from './model/types/dashboard.interface';

export { getDashboardUserListSelector } from './model/selectors/getDashboardUserList/getDashboardUserList.selector';
export { getDashboardIsLoadingSelector } from './model/selectors/getDashboardIsLoading/getDashboardIsLoading.selector';
export { getDashboardErrorSelector } from './model/selectors/getDashboardError/getDashboardError.selector';

export {
    dashboardReducer,
    dashboardActions,
} from './model/slice/dashboard.slice';

export { fetchUserListService } from './model/services/fetchUserList/fetchUserList.service';
