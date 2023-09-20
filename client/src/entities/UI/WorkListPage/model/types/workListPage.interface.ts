import { EntityState } from '@reduxjs/toolkit';
import { UIEntityViewI } from '@/entities/UI/UI';
import { WorkI } from '@/entities/Work';
import { WorkSortFieldEnums } from '../enums/WorkSortField.enums';

export interface WorkListPageSchemaI extends UIEntityViewI, EntityState<WorkI> {
    isLoading?: boolean;
    error?: string;

    sort: WorkSortFieldEnums;

    _inited: boolean;
}
