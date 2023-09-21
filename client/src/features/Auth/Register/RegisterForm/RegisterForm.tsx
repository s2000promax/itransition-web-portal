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
import { VStack } from '@/shared/UI-kit/Stack';
import cls from './RegisterForm.module.scss';
import {
    getRegisterEmailSelector,
    getRegisterErrorSelector,
    getRegisterFirstNameSelector,
    getRegisterIsLoadingSelector,
    getRegisterLastNameSelector,
    getRegisterPasswordSelector,
    registerActions,
    registerReducer,
} from '@/entities/Auth';
import { register } from '@/entities/Auth';

export interface RegisterFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    registerForm: registerReducer,
};

const RegisterForm = memo(({ className, onSuccess }: RegisterFormProps) => {
    const { t } = useTranslation('auth');

    const dispatch = useAppDispatch();
    const firstName = useSelector(getRegisterFirstNameSelector);
    const lastName = useSelector(getRegisterLastNameSelector);
    const email = useSelector(getRegisterEmailSelector);
    const password = useSelector(getRegisterPasswordSelector);
    const isLoading = useSelector(getRegisterIsLoadingSelector);
    const error = useSelector(getRegisterErrorSelector);

    const onChangeFirstName = useCallback(
        (value: string) => {
            dispatch(registerActions.setFirstName(value));
        },
        [dispatch],
    );

    const onChangeLastName = useCallback(
        (value: string) => {
            dispatch(registerActions.setLastName(value));
        },
        [dispatch],
    );

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(registerActions.setEmail(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(registerActions.setPassword(value));
        },
        [dispatch],
    );

    const onRegister = useCallback(async () => {
        const registerData = {
            firstName,
            lastName,
            email,
            password,
        };

        try {
            const result = await dispatch(register(registerData));
            console.log(result);
            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess();
            }
        } catch (e) {
            console.log(e);
        }
    }, [dispatch, onSuccess, password, email]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <VStack
                gap="16"
                className={classNames(cls.LoginForm, {}, [className])}
            >
                <Text title={t('Register')} />
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
                    placeholder={t('First Name')}
                    onChange={onChangeFirstName}
                    value={firstName}
                />
                <Input
                    type="text"
                    className={cls.input}
                    placeholder={t('Last Name')}
                    onChange={onChangeLastName}
                    value={lastName}
                />
                <Input
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
                    onClick={onRegister}
                    disabled={isLoading}
                >
                    {t('Register')}
                </Button>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default RegisterForm;
