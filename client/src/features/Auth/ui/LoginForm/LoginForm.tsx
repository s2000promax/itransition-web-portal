import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Text } from '@/shared/UI-kit/Text';
import { Button } from '@/shared/UI-kit/Button';
import { Input } from '@/shared/UI-kit/Input';
import { VStack } from '@/shared/UI-kit/Stack';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();

    const username = '';
    const password = '';
    const isLoading = false;
    const error = '';

    const onChangeUsername = useCallback((value: string) => {}, []);

    const onChangePassword = useCallback((value: string) => {}, []);

    const onLoginClick = useCallback(async () => {}, []);

    return (
        <VStack
            gap="16"
            className={classNames(cls.LoginForm, {}, [className])}
        >
            <Text title={t('Login')} />
            {error && (
                <Text
                    text={t('Wrong login or password')}
                    variant="error"
                />
            )}
            <Input
                autofocus
                type="text"
                className={cls.input}
                placeholder={t('Email')}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Password')}
                onChange={onChangePassword}
                value={password}
            />
            <Button
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('Login')}
            </Button>
        </VStack>
    );
});

export default LoginForm;
