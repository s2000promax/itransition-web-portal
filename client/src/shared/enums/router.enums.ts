export enum AppRoutesEnums {
    MAIN = 'main',
    SETTINGS = 'settings',
    ABOUT = 'about',
    PROFILE = 'profile',
    REVIEWS = 'reviews',
    REVIEWS_DETAILS = 'reviews_details',
    REVIEWS_CREATE = 'reviews_create',
    REVIEWS_EDIT = 'reviews_edit',
    ADMIN_DASHBOARD = 'admin_panel',
    FORBIDDEN = 'forbidden',
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteReviews = () => '/reviews';
export const getRouteReviewsDetails = (id: string) => `/reviews/${id}`;
export const getRouteReviewsCreate = () => '/reviews/new';
export const getRouteReviewsEdit = (id: string) => `/reviews/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';

export const AppRouteByPathPattern: Record<string, AppRoutesEnums> = {
    [getRouteMain()]: AppRoutesEnums.MAIN,
    [getRouteSettings()]: AppRoutesEnums.SETTINGS,
    [getRouteAbout()]: AppRoutesEnums.ABOUT,
    [getRouteProfile(':id')]: AppRoutesEnums.PROFILE,
    [getRouteAdmin()]: AppRoutesEnums.ADMIN_DASHBOARD,
    [getRouteForbidden()]: AppRoutesEnums.FORBIDDEN,
};
