import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ReviewsPage } from '@/pages/ReviewsPage';
import { ReviewDetailsPage } from '@/pages/ReviewDetailsPage';
import { ReviewEditPage } from '@/pages/ReviewEditPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AppRoutesEnums } from '@/shared/enums/router.enums';
import { AppRoutesPropsT } from '@/shared/types/router.type';
import { UserRolesEnums } from '@/entities/User';
import {
    getRouteAbout,
    getRouteAdmin,
    getRouteForbidden,
    getRouteMain,
    getRouteProfile,
    getRouteReviewCreate,
    getRouteReviewDetails,
    getRouteReviewEdit,
    getRouteReviews,
    getRouteSettings,
} from '@/shared/routes/routes.patterns';

export const routeConfig: Record<AppRoutesEnums, AppRoutesPropsT> = {
    [AppRoutesEnums.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutesEnums.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />,
    },
    [AppRoutesEnums.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutesEnums.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutesEnums.REVIEWS]: {
        path: getRouteReviews(),
        element: <ReviewsPage />,
        authOnly: true,
    },
    [AppRoutesEnums.REVIEW_DETAILS]: {
        path: getRouteReviewDetails(':id'),
        element: <ReviewDetailsPage />,
        // authOnly: true,
    },
    [AppRoutesEnums.REVIEW_CREATE]: {
        path: getRouteReviewCreate(),
        element: <ReviewEditPage />,
        authOnly: true,
    },
    [AppRoutesEnums.REVIEW_EDIT]: {
        path: getRouteReviewEdit(':id'),
        element: <ReviewEditPage />,
        authOnly: true,
    },
    [AppRoutesEnums.ADMIN_DASHBOARD]: {
        path: getRouteAdmin(),
        element: <AdminDashboardPage />,
        authOnly: true,
        roles: [UserRolesEnums.ADMIN],
    },
    [AppRoutesEnums.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutesEnums.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
