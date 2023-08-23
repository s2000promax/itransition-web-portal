import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Button } from '@/shared/UI-kit/Button';
import { HStack } from '@/shared/UI-kit/Stack';
import { LoginModal } from '@/features/Auth';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation('navbar');
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = true;

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
                    <div>{t('Notification')}</div>
                    <div>{t('Avatar')}</div>
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
