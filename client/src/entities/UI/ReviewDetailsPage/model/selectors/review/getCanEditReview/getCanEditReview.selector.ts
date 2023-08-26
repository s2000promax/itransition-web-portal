import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { getReviewDataSelector } from '@/entities/Review';

export const getCanEditReviewSelector = createSelector(
    getReviewDataSelector,
    getUserAuthData,
    (article, user) => {
        if (!article || !user) {
            return false;
        }

        return article.user.id === user.id;
    },
);
