import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UISchemaI } from '../types/ui.interface';

const initialState: UISchemaI = {
    scroll: {},
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const { actions: uiActions } = uiSlice;
export const { reducer: uiReducer } = uiSlice;
