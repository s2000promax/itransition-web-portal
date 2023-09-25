import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/libs/classNames/classNames';
import { getUserDataSelector, isUserRoleAdminSelector } from '@/entities/User';
import { Dropdown } from '@/shared/UI-kit/Popups';
import { Avatar } from '@/shared/UI-kit/Avatar';
import {
    getRouteAbout,
    getRouteAdmin,
    getRouteProfile,
    getRouteReviewList,
    getRouteWorkList,
} from '@/shared/routes/routes.patterns';
import { removeAuthData } from '@/entities/Auth';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation('navbar');
    const dispatch = useAppDispatch();
    const isAdmin = useSelector(isUserRoleAdminSelector);
    const userData = useSelector(getUserDataSelector);

    const onLogout = useCallback(() => {
        dispatch(removeAuthData());
    }, [dispatch]);

    const isAdminDashboardAvailable = isAdmin;

    if (!userData) {
        return null;
    }

    const items = [
        ...(isAdminDashboardAvailable
            ? [
                  {
                      content: t('Dashboard'),
                      href: getRouteAdmin(),
                  },
              ]
            : []),
        {
            content: t('Reviews'),
            href: getRouteReviewList(),
        },
        {
            content: t('Works'),
            href: getRouteWorkList(),
        },
        {
            content: t('Profile'),
            href: getRouteProfile(userData.id),
        },
        {
            content: t('About'),
            href: getRouteAbout(),
        },
        {
            content: t('Logout'),
            onClick: onLogout,
        },
    ];

    return (
        <Dropdown
            direction="bottom left"
            className={classNames('', {}, [className])}
            items={items}
            trigger={
                <Avatar
                    size={40}
                    src={userData.avatar}
                />
            }
        />
    );
});
