import { Suspense } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Modal } from '@/shared/UI-kit/Modal';
import { Loader } from '@/shared/UI-kit/Loader';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <LoginFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
);
