import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';

export const WorkCardError = () => {
    const { t } = useTranslation('work');

    return (
        <HStack
            justify="center"
            max
        >
            <Text
                variant="error"
                title={t('error')}
                text={t('refresh')}
                align="center"
            />
        </HStack>
    );
};
