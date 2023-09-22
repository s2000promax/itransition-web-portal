import ReviewIcon from '@/shared/assets/ui/icons/review.svg';
import WorksIcon from '@/shared/assets/ui/icons/works-library.svg';
import AboutIcon from '@/shared/assets/ui/icons/Info.svg';
import ProfileIcon from '@/shared/assets/ui/icons/avatar.svg';
import DashboardIcon from '@/shared/assets/ui/icons/dashboard.svg';

import { SidebarItemI } from '../types/sidebar.interface';

import {
    getRouteAbout,
    getRouteAdmin,
    getRouteMain,
    getRouteProfile,
    getRouteWorkList,
} from '@/shared/routes/routes.patterns';
import { useSelector } from 'react-redux';
import { getUserDataSelector, isUserRoleAdminSelector } from '@/entities/User';

export const useSidebarItems = () => {
    const userData = useSelector(getUserDataSelector);
    const isUserAdmin = useSelector(isUserRoleAdminSelector);

    const sidebarItemsList: SidebarItemI[] = [
        {
            path: getRouteMain(),
            Icon: ReviewIcon,
            text: 'Reviews',
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: 'About',
        },
        {
            path: getRouteWorkList(),
            Icon: WorksIcon,
            text: 'Works',
        },
    ];

    if (userData) {
        sidebarItemsList.push({
            path: getRouteProfile(userData.id),
            Icon: ProfileIcon,
            text: 'Profile',
            authOnly: true,
        });
    }

    if (isUserAdmin) {
        sidebarItemsList.push({
            path: getRouteAdmin(),
            Icon: DashboardIcon,
            text: 'Dashboard',
            authOnly: true,
        });
    }

    return sidebarItemsList;
};
