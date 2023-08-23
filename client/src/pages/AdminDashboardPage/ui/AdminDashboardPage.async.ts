import { lazy } from 'react';

export const AdminDashboardPageAsync = lazy(
    () => import('./AdminDashboardPage'),
);
