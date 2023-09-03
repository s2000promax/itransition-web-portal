import { createSelector } from '@reduxjs/toolkit';
import { StateSchemaI } from '@/app/providers/StoreProvider';
import { UserRolesEnums } from '../../enums/userRoles.enums';

export const getUserRolesSelector = (state: StateSchemaI) =>
    state.user.userData?.role;

export const isUserRoleAdminSelector = createSelector(
    getUserRolesSelector,
    (roles) => Boolean(roles?.includes(UserRolesEnums.ADMIN)),
);

export const isUserRoleUserSelector = createSelector(
    getUserRolesSelector,
    (roles) => Boolean(roles?.includes(UserRolesEnums.USER)),
);
