import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';

export const ProfileCardError = () => {
    const { t } = useTranslation();

    return (
        <HStack
            justify="center"
            max
        >
            <Text
                variant="error"
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align="center"
            />
        </HStack>
    );
};