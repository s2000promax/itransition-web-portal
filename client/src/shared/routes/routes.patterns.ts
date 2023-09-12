import { AppRoutesEnums } from '@/shared/enums/router.enums';

export const getRouteMain = () => '/';
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteReviews = () => '/reviews';
export const getRouteReviewDetails = (id: string) => `/${id}`;
export const getRouteReviewCreate = () => '/new';
export const getRouteReviewEdit = (id: string) => `/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';

export const AppRouteByPathPattern: Record<string, AppRoutesEnums> = {
    [getRouteMain()]: AppRoutesEnums.MAIN,
    [getRouteSettings()]: AppRoutesEnums.SETTINGS,
    [getRouteAbout()]: AppRoutesEnums.ABOUT,
    [getRouteProfile(':id')]: AppRoutesEnums.PROFILE,
    [getRouteReviews()]: AppRoutesEnums.REVIEWS,
    [getRouteReviewDetails(':id')]: AppRoutesEnums.REVIEW_DETAILS,
    [getRouteReviewEdit('id')]: AppRoutesEnums.REVIEW_EDIT,
    [getRouteReviewCreate()]: AppRoutesEnums.REVIEW_CREATE,
    [getRouteAdmin()]: AppRoutesEnums.ADMIN_DASHBOARD,
    [getRouteForbidden()]: AppRoutesEnums.FORBIDDEN,
};
