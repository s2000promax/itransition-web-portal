import React from 'react';
import { useTranslation } from 'react-i18next';

const ReviewsDetailsPage = () => {
    const { t } = useTranslation('reviews');

    return <div data-testid="ReviewsPage">{t('Reviews Details Page')}</div>;
};

export default ReviewsDetailsPage;
