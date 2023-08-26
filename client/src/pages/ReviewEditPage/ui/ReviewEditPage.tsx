import React from 'react';
import { useTranslation } from 'react-i18next';

const ReviewEditPage = () => {
    const { t } = useTranslation('review_edit');

    return <div data-testid="ReviewsPage">{t('Review Edit Page')}</div>;
};

export default ReviewEditPage;
