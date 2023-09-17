import { AppRoutesEnums } from '@/shared/enums/router.enums';

export const getRouteMain = () => '/';
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteWorkEdit = (id: string) => `/work/${id}/edit`;
export const getRouteWorkDetails = (id: string) => `/work/${id}`;
export const getRouteWorkList = () => '/works';
export const getRouteReviewList = () => '/reviews';
export const getRouteReviewDetails = (id: string) => `/${id}`;
export const getRouteReviewCreate = () => '/create';
export const getRouteReviewEdit = (id: string) => `/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';

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
    [getRouteForbidden()]: AppRoutesEnums.FORBIDDEN,
};
