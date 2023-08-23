export enum AppRoutesEnums {
    MAIN = 'main',
    SETTINGS = 'settings',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    REVIEWS = 'reviews',
    REVIEWS_DETAILS = 'reviews_details',
    REVIEWS_CREATE = 'reviews_create',
    REVIEWS_EDIT = 'reviews_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
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
    [getRouteArticles()]: AppRoutesEnums.ARTICLES,
    [getRouteArticleDetails(':id')]: AppRoutesEnums.ARTICLE_DETAILS,
    [getRouteArticleCreate()]: AppRoutesEnums.ARTICLE_CREATE,
    [getRouteArticleEdit(':id')]: AppRoutesEnums.ARTICLE_EDIT,
    [getRouteAdmin()]: AppRoutesEnums.ADMIN_PANEL,
    [getRouteForbidden()]: AppRoutesEnums.FORBIDDEN,
};
