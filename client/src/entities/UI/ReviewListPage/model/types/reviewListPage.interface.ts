import { EntityState } from '@reduxjs/toolkit';
import { ReviewI } from '@/entities/Review';
import { UIEntityViewI } from '@/entities/UI/UI';
import { ReviewSortFieldEnums } from '@/entities/UI/ReviewListPage';

export interface ReviewListPageSchemaI
    extends UIEntityViewI,
        EntityState<ReviewI> {
    isLoading?: boolean;
    error?: string;

    sort: ReviewSortFieldEnums;

    _inited: boolean;
}
