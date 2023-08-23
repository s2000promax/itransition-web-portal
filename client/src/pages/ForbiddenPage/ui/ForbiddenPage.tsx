import React from 'react';
import { useTranslation } from 'react-i18next';

export const ForbiddenPage = () => {
    const { t } = useTranslation('forbidden');

    return (
        <div data-testid="ForbiddenPage">
            {t('You do not have access to this page.')}
        </div>
    );
};
