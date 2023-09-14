import { EntityState } from '@reduxjs/toolkit';
import { SortOrderT } from '@/shared/types/sort.type';
import {
    ReviewI,
    ReviewSortFieldEnums,
    ReviewViewEnums,
} from '@/entities/Review';
import { WorkTypeEnums } from '@/entities/Work';

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
    type: WorkTypeEnums;

    _inited: boolean;
}
