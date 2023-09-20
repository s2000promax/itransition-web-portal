import { Suspense } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { RegisterFormAsync } from '../RegisterForm/RegisterForm.async';
import { Modal } from '@/shared/UI-kit/Modal';
import { Loader } from '@/shared/UI-kit/Loader';

interface RegisterModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const RegisterModal = ({
    className,
    isOpen,
    onClose,
}: RegisterModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <RegisterFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
);
