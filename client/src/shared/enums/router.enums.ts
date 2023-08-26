export enum AppRoutesEnums {
    MAIN = 'main',
    SETTINGS = 'settings',
    ABOUT = 'about',
    PROFILE = 'profile',
    REVIEWS = 'reviews',
    REVIEW_DETAILS = 'review_details',
    REVIEW_CREATE = 'review_create',
    REVIEW_EDIT = 'review_edit',
    ADMIN_DASHBOARD = 'admin_panel',
    FORBIDDEN = 'forbidden',
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteReviews = () => '/reviews';
export const getRouteReviewDetails = (id: string) => `/review/${id}`;
export const getRouteReviewCreate = () => '/review/new';
export const getRouteReviewEdit = (id: string) => `/review/${id}/edit`;
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
