import React from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';

export const ConstructorCardError = () => {
    const { t } = useTranslation('editReview');

    return (
        <HStack
            justify="center"
            max
        >
            <Text
                variant="error"
                title={t('An error occurred while loading the review')}
                text={t('Try refreshing the page')}
                align="center"
            />
        </HStack>
    );
};
