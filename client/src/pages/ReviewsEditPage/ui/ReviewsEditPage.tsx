import React from 'react';
import { useTranslation } from 'react-i18next';

const ReviewsEditPage = () => {
    const { t } = useTranslation('reviews');

    return <div data-testid="ReviewsPage">{t('Reviews Edit Page')}</div>;
};

export default ReviewsEditPage;
