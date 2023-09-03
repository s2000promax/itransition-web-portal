import { createSelector } from '@reduxjs/toolkit';
import { getUserDataSelector } from '@/entities/User';
import { getReviewDataSelector } from '@/entities/Review';

export const getCanEditReviewSelector = createSelector(
    getReviewDataSelector,
    getUserDataSelector,
    (article, user) => {
        if (!article || !user) {
            return false;
        }

        return article.user.id === user.id;
    },
);
