import { EntityState } from '@reduxjs/toolkit';
import { ReviewI } from '@/entities/Review';
import { UIEntityViewI } from '@/entities/UI/UI';

export interface ReviewListPageSchemaI
    extends UIEntityViewI,
        EntityState<ReviewI> {
    isLoading?: boolean;
    error?: string;

    /*
    page: number;
    limit: number;
    hasMore: boolean;

    view: ViewEnums;
    order: SortOrderT;
    sort: SortFieldEnums;
    search: string;
    type: WorkTypeEnums;
     */

    _inited: boolean;
}
