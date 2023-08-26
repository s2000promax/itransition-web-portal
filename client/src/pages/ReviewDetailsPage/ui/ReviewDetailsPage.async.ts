import { FC, lazy } from 'react';
import { ReviewDetailsPageProps } from './ReviewDetailsPage';

export const ReviewDetailsPageAsync = lazy<FC<ReviewDetailsPageProps>>(
    () => import('./ReviewDetailsPage'),
);
