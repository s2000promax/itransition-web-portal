import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/libs/classNames/classNames';
import { getUserAuthData, isUserRoleAdmin, userActions } from '@/entities/User';
import { Dropdown } from '@/shared/UI-kit/Popups';
import { Avatar } from '@/shared/UI-kit/Avatar';
import {
    getRouteAdmin,
    getRouteProfile,
    getRouteSettings,
} from '@/shared/routes/routes.patterns';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation('navbar');
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserRoleAdmin);
    const authData = useSelector(getUserAuthData);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminDashboardAvailable = isAdmin;

    if (!authData) {
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
            content: t('Settings'),
            href: getRouteSettings(),
        },
        {
            content: t('Profile'),
            href: getRouteProfile(authData.id),
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
                    src={authData.avatar}
                />
            }
        />
    );
});
