import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t } = useTranslation('main');

    return <div data-testid="MainPage">{t('Main Page')}</div>;
};

export default memo(MainPage);
