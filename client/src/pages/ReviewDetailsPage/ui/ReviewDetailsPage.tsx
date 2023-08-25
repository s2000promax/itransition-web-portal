import React from 'react';
import { useTranslation } from 'react-i18next';

const ReviewDetailsPage = () => {
    const { t } = useTranslation('review_details');

    return <div data-testid="ReviewsPage">{t('Reviews Details Page')}</div>;
};

export default ReviewDetailsPage;
