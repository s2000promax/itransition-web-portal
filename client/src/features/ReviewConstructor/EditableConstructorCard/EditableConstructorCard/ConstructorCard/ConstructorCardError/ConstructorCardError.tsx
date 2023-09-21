import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';

export const ConstructorCardError = () => {
    const { t } = useTranslation('reviewConstructor');

    return (
        <HStack
            justify="center"
            max
        >
            <Text
                variant="error"
                title={t('message')}
                text={t('refresh')}
                align="center"
            />
        </HStack>
    );
};
