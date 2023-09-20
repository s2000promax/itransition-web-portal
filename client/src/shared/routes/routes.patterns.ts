import { AppRoutesEnums } from '@/shared/enums/router.enums';

export const getRouteMain = () => AppRoutesEnums.MAIN;
export const getRouteAbout = () => '/' + AppRoutesEnums.ABOUT;
export const getRouteProfile = (id: string) =>
    `/${AppRoutesEnums.PROFILE}/${id}`;
export const getRouteWorkEdit = (id: string) => `/work/${id}/edit`;
export const getRouteWorkDetails = (id: string) => `/work/${id}`;
export const getRouteWorkList = () => '/' + AppRoutesEnums.WORK_LIST;
export const getRouteReviewList = () => '/' + AppRoutesEnums.REVIEW_LIST;
export const getRouteReviewDetails = (id: string) => `/${id}`;
export const getRouteReviewCreate = () => '/create';
export const getRouteReviewEdit = (id: string) => `/${id}/edit`;
export const getRouteAdmin = () => '/' + AppRoutesEnums.ADMIN_DASHBOARD;
export const getRouteSuccessAuthProvider = () =>
    '/' + AppRoutesEnums.SUCCESS_AUTH_PROVIDER;
export const getRouteForbidden = () => '/' + AppRoutesEnums.FORBIDDEN;

export const AppRouteByPathPattern: Record<string, AppRoutesEnums> = {
    [getRouteMain()]: AppRoutesEnums.MAIN,
    [getRouteAbout()]: AppRoutesEnums.ABOUT,
    [getRouteProfile(':id')]: AppRoutesEnums.PROFILE,
    [getRouteWorkDetails(':id')]: AppRoutesEnums.WORK_DETAILS,
    [getRouteWorkEdit(':id')]: AppRoutesEnums.WORK_EDIT,
    [getRouteWorkList()]: AppRoutesEnums.WORK_LIST,
    [getRouteReviewList()]: AppRoutesEnums.REVIEW_LIST,
    [getRouteReviewDetails(':id')]: AppRoutesEnums.REVIEW_DETAILS,
    [getRouteReviewEdit(':id')]: AppRoutesEnums.REVIEW_EDIT,
    [getRouteReviewCreate()]: AppRoutesEnums.REVIEW_CREATE,
    [getRouteAdmin()]: AppRoutesEnums.ADMIN_DASHBOARD,
    [getRouteSuccessAuthProvider()]: AppRoutesEnums.SUCCESS_AUTH_PROVIDER,
    [getRouteForbidden()]: AppRoutesEnums.FORBIDDEN,
};
