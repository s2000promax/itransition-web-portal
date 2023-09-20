import React, { useCallback, useEffect, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { getAuthDataSelector, loginWithProviderService } from '@/entities/Auth';
import { useNavigate } from 'react-router-dom';
import { AppRoutesEnums } from '@/shared/enums/router.enums';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { useTranslation } from 'react-i18next';
import { ProviderEnums } from '@/shared/enums/provider.enums';

export interface SuccessAuthPageProps {
    className?: string;
}

const SuccessAuthProviderPage = (props: SuccessAuthPageProps) => {
    const { className } = props;
    const { t } = useTranslation('successAuth');
    const [token, setToken] = useState<string | undefined>();
    const [provider, setProvider] = useState<ProviderEnums | undefined>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(getAuthDataSelector);

    const handleLoginWithProvider = useCallback(() => {
        if (token && provider) {
            dispatch(loginWithProviderService({ token, provider }));
        }
    }, [dispatch, token, provider]);

    const debouncedLoginWithProvider = useDebounce(
        handleLoginWithProvider,
        300,
    );

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const _token = queryParams.get('token');
        const _provider = queryParams.get('provider');

        if (_token && _provider) {
            setToken(_token);
            setProvider(_provider as ProviderEnums);
        }

        if (token && provider) {
            debouncedLoginWithProvider();
        }
    }, [token, provider]);

    useEffect(() => {
        if (isAuth) {
            navigate(AppRoutesEnums.MAIN);
        }
    }, [isAuth]);

    return (
        <VStack className={classNames('', {}, [className])}>
            <Text title={t('await authorization')} />
            <Skeleton
                width={200}
                height={20}
            />
        </VStack>
    );
};

export default SuccessAuthProviderPage;
