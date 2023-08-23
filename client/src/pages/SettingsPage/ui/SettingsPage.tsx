import React from 'react';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
    const { t } = useTranslation('settings');

    return <div data-testid="ReviewsPage">{t('Settings Page')}</div>;
};

export default SettingsPage;
