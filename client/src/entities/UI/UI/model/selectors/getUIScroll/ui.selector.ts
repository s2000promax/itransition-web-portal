import { createSelector } from '@reduxjs/toolkit';
import { StateSchemaI } from '@/app/providers/StoreProvider';

const getUIScroll = (state: StateSchemaI) => state.ui.scroll;

export const getUIScrollByPath = createSelector(
    getUIScroll,
    (state: StateSchemaI, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
