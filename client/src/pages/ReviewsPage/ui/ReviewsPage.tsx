import React from 'react';
import { useTranslation } from 'react-i18next';

const ReviewsPage = () => {
    const { t } = useTranslation('reviews');

    return <div data-testid="ReviewsPage">{t('Reviews Page')}</div>;
};

export default ReviewsPage;
