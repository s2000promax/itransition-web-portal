import { createSelector } from '@reduxjs/toolkit';
import { getUserDataSelector } from '@/entities/User';
import { getReviewDataSelector } from '@/entities/Review';

export const getCanEditReviewSelector = createSelector(
    getReviewDataSelector,
    getUserDataSelector,
    (review, user) => {
        if (!review || !user) {
            return false;
        }

        return review.ownerId === user.id;
    },
);
