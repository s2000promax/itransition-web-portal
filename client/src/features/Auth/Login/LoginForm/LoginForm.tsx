import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Text } from '@/shared/UI-kit/Text';
import { Button } from '@/shared/UI-kit/Button';
import { Input } from '@/shared/UI-kit/Input';
import { HStack, VStack } from '@/shared/UI-kit/Stack';
import cls from './LoginForm.module.scss';
import {
    getLoginEmailSelector,
    getLoginErrorSelector,
    getLoginIsLoadingSelector,
    getLoginPasswordSelector,
    loginActions,
    loginByEmail,
    loginReducer,
} from '@/entities/Auth';
import { ProviderEnums } from '@/shared/enums/provider.enums';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation('auth');

    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmailSelector);
    const password = useSelector(getLoginPasswordSelector);
    const isLoading = useSelector(getLoginIsLoadingSelector);
    const error = useSelector(getLoginErrorSelector);

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(loginActions.setEmail(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLogin = useCallback(async () => {
        const loginData = {
            email,
            password,
        };

        const result = await dispatch(loginByEmail(loginData));

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, onSuccess, password, email]);

    const handleGoogleLogin = async () => {
        window.location.href = `${__API__}/auth/${ProviderEnums.GOOGLE}`;
    };

    const handleFacebookLogin = async () => {
        window.location.href = `${__API__}/auth/${ProviderEnums.FACEBOOK}`;
    };

    const handleYandexLogin = async () => {
        window.location.href = `${__API__}/auth/${ProviderEnums.YANDEX}`;
    };

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <VStack
                gap="16"
                className={classNames(cls.LoginForm, {}, [className])}
            >
                <VStack
                    max
                    align={'center'}
                >
                    <Text title={t('Welcome')} />
                    <Text
                        title={t('Sign in to continue')}
                        size={'s'}
                    />
                </VStack>
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
                    onChange={onChangeEmail}
                    value={email}
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
                    onClick={onLogin}
                    disabled={isLoading}
                >
                    {t('Login')}
                </Button>
                <VStack
                    max
                    align={'center'}
                >
                    <Text
                        title={t('Sign in with')}
                        size={'s'}
                    />
                </VStack>
                <VStack
                    max
                    align={'center'}
                >
                    <HStack gap="8">
                        <Button
                            className={cls.loginBtn}
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                        >
                            {t('Google')}
                        </Button>
                        <Button
                            className={cls.loginBtn}
                            onClick={handleFacebookLogin}
                            disabled={isLoading}
                        >
                            {t('Facebook')}
                        </Button>
                        <Button
                            className={cls.loginBtn}
                            onClick={handleYandexLogin}
                            disabled={isLoading}
                        >
                            {t('Yandex')}
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
