import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Button } from '@/shared/UI-kit/Button';
import { HStack } from '@/shared/UI-kit/Stack';
import { LoginModal, RegisterModal } from '@/features/Auth';
import cls from './Navbar.module.scss';
import { useSelector } from 'react-redux';
import { AvatarDropdown } from '@/features/UI/AvatarDropdown';
import { NotificationButton } from '@/features/UI/Notification';
import { getUserDataSelector } from '@/entities/User';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation('navbar');
    const [isLoginModal, setIsLoginModal] = useState(false);
    const [isRegisterModal, setIsRegisterModal] = useState(false);
    const userData = useSelector(getUserDataSelector);

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
