import MainIcon from '@/shared/assets/ui/icons/home.svg';
import ReviewIcon from '@/shared/assets/ui/icons/review.svg';
import AboutIcon from '@/shared/assets/ui/icons/Info.svg';
import ProfileIcon from '@/shared/assets/ui/icons/avatar.svg';

import { SidebarItemI } from '../types/sidebar.interface';

import {
    getRouteAbout,
    getRouteMain,
    getRouteProfile,
    getRouteReviews,
} from '@/shared/routes/routes.patterns';

export const useSidebarItems = () => {
    const userData = {
        id: '123',
    };
    const sidebarItemsList: SidebarItemI[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon,
            text: 'Main',
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: 'About the portal',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: ProfileIcon,
                text: 'Profile',
                authOnly: true,
            },
            {
                path: getRouteReviews(),
                Icon: ReviewIcon,
                text: 'Reviews',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
};
