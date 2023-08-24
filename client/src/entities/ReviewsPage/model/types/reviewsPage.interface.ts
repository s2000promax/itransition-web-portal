import { EntityState } from '@reduxjs/toolkit';
import { SortOrder } from '@/shared/types/sort.type';
import {
    ReviewI,
    ReviewSortFieldEnums,
    ReviewTypeEnums,
    ReviewViewEnums,
} from '@/entities/Review';

export interface ReviewsPageSchemaI extends EntityState<ReviewI> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;

    // filters
    view: ReviewViewEnums;
    order: SortOrder;
    sort: ReviewSortFieldEnums;
    search: string;
    type: ReviewTypeEnums;

    _inited: boolean;
}
