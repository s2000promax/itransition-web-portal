import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';

const AdminDashboardPage = () => {
    const { t } = useTranslation('admin');

    return (
        <Page>
            <VStack gap="16">
                <Text title={t('Admin dashboard')} />
            </VStack>
        </Page>
    );
};

export default AdminDashboardPage;
