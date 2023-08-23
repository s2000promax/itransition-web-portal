import React from 'react';
import { useTranslation } from 'react-i18next';

const ForbiddenPage = () => {
    const { t } = useTranslation('');

    return (
        <div data-testid="ForbiddenPage">
            {t('You do not have access to this page.')}
        </div>
    );
};

export default ForbiddenPage;
