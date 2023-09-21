import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardSchemaI } from '../types/dashboard.interface';
import { fetchUserListService } from '../services/fetchUserList/fetchUserList.service';
import { UserI } from '@/entities/User';

const initialState: DashboardSchemaI = {
    isLoading: false,
    error: undefined,
    usersList: [],
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserListService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchUserListService.fulfilled,
                (state, action: PayloadAction<UserI[]>) => {
                    state.isLoading = false;
                    state.usersList = action.payload;
                },
            )
            .addCase(fetchUserListService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: dashboardActions } = dashboardSlice;
export const { reducer: dashboardReducer } = dashboardSlice;
