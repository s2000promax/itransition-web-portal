import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Button } from '@/shared/UI-kit/Button';
import { HStack } from '@/shared/UI-kit/Stack';
import { LoginModal } from '@/features/Auth';
import cls from './Navbar.module.scss';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { AvatarDropdown } from '@/features/UI/AvatarDropdown';
import { NotificationButton } from '@/features/UI/Notification';
import { AppLink } from '@/shared/UI-kit/AppLink';
import CreateIcon from '@/shared/assets/ui/icons/edit.svg';
import { Icon } from '@/shared/UI-kit/Icon';
import { getRouteReviewCreate } from '@/shared/routes/routes.patterns';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation('navbar');
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <HStack
                    gap="16"
                    className={cls.actions}
                >
                    <AppLink to={getRouteReviewCreate()}>
                        <Icon Svg={CreateIcon} />
                    </AppLink>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                variant="clear"
                className={cls.links}
                onClick={onShowModal}
            >
                {t('Login')}
            </Button>

            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </header>
    );
});
