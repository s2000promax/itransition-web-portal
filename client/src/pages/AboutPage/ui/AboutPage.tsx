import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
    const { t } = useTranslation('about');

    return <div data-testid="AboutPage">{t('About the portal')}</div>;
};

export default AboutPage;
