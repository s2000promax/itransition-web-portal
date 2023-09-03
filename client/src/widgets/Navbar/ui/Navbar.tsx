import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Button } from '@/shared/UI-kit/Button';
import { HStack } from '@/shared/UI-kit/Stack';
import { LoginModal, RegisterModal } from '@/features/Auth';
import cls from './Navbar.module.scss';
import { useSelector } from 'react-redux';
import { AvatarDropdown } from '@/features/UI/AvatarDropdown';
import { NotificationButton } from '@/features/UI/Notification';
import { AppLink } from '@/shared/UI-kit/AppLink';
import CreateIcon from '@/shared/assets/ui/icons/edit.svg';
import { Icon } from '@/shared/UI-kit/Icon';
import { getRouteReviewCreate } from '@/shared/routes/routes.patterns';
import { getAuthDataSelector } from '@/entities/Auth';
import { getUserDataSelector, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation('navbar');
    const [isLoginModal, setIsLoginModal] = useState(false);
    const [isRegisterModal, setIsRegisterModal] = useState(false);
    const dispatch = useAppDispatch();
    const authData = useSelector(getAuthDataSelector);
    const userData = useSelector(getUserDataSelector);

    useEffect(() => {
        if (authData) {
            dispatch(initAuthData());
        }
    }, [authData]);

    const onCloseModal = useCallback(() => {
        setIsLoginModal(false);
        setIsRegisterModal(false);
    }, []);

    const onShowModal = useCallback((name: string) => {
        if (name === 'login') {
            setIsLoginModal(true);
        }

        if (name === 'register') {
            setIsRegisterModal(true);
        }
    }, []);

    if (userData) {
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
            <HStack gap="8">
                <Button
                    name="login"
                    variant="clear"
                    className={cls.links}
                    onClick={() => onShowModal('login')}
                >
                    {t('Login')}
                </Button>

                <Button
                    name="register"
                    variant="clear"
                    className={cls.links}
                    onClick={() => onShowModal('register')}
                >
                    {t('Register')}
                </Button>
            </HStack>

            {isLoginModal && (
                <LoginModal
                    isOpen={isLoginModal}
                    onClose={onCloseModal}
                />
            )}

            {isRegisterModal && (
                <RegisterModal
                    isOpen={isRegisterModal}
                    onClose={onCloseModal}
                />
            )}
        </header>
    );
});
