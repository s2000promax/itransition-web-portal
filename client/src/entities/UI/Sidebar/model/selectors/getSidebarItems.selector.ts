import ReviewIcon from '@/shared/assets/ui/icons/review.svg';
import WorksIcon from '@/shared/assets/ui/icons/works-library.svg';
import AboutIcon from '@/shared/assets/ui/icons/Info.svg';
import ProfileIcon from '@/shared/assets/ui/icons/avatar.svg';

import { SidebarItemI } from '../types/sidebar.interface';

import {
    getRouteAbout,
    getRouteMain,
    getRouteProfile,
    getRouteReviews,
    getRouteWorkList,
} from '@/shared/routes/routes.patterns';
import { useSelector } from 'react-redux';
import { getUserDataSelector } from '@/entities/User';

export const useSidebarItems = () => {
    const userData = useSelector(getUserDataSelector);
    const sidebarItemsList: SidebarItemI[] = [
        {
            path: getRouteMain(),
            Icon: ReviewIcon,
            text: 'Reviews',
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: 'About the portal',
        },
        {
            path: getRouteWorkList(),
            Icon: WorksIcon,
            text: 'Works',
            authOnly: true,
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

    return sidebarItemsList;
};
