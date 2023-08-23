import React from 'react';
import { useTranslation } from 'react-i18next';

const AdminDashboardPage = () => {
    const { t } = useTranslation('admin');

    return <div data-testid="AdminPanelPage">{t('Admin page')}</div>;
};

export default AdminDashboardPage;
