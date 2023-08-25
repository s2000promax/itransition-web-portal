import { EntityState } from '@reduxjs/toolkit';
import { SortOrderT } from '@/shared/types/sort.type';
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
    order: SortOrderT;
    sort: ReviewSortFieldEnums;
    search: string;
    type: ReviewTypeEnums;

    _inited: boolean;
}
