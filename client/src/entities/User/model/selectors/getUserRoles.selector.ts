import { createSelector } from '@reduxjs/toolkit';
import { StateSchemaI } from '@/app/providers/StoreProvider';
import { UserRolesEnums } from '../enums/userRoles.enums';

export const getUserRoles = (state: StateSchemaI) => state.user.authData?.roles;

export const isUserRoleAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRolesEnums.ADMIN)),
);

export const isUserRoleUser = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRolesEnums.USER)),
);
