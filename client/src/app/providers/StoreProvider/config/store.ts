import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState, Reducer } from 'redux';
import { StateSchemaI } from './stateSchema.interface';
import { createReducerManager } from './reducerManager';
import { userReducer } from '@/entities/User';
import { uiReducer } from '@/entities/UI';
import { rtkApi } from '@/shared/api/rtk.api';

export function createReduxStore(
    initialState?: StateSchemaI,
    asyncReducers?: ReducersMapObject<StateSchemaI>,
) {
    const rootReducers: ReducersMapObject<StateSchemaI> = {
        ...asyncReducers,
        user: userReducer,
        ui: uiReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchemaI>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
