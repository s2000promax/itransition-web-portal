import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState, Reducer } from 'redux';
import { StateSchemaI, ThunkExtraArg } from './stateSchema.interface';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtk.api';
import { createReducerManager } from './reducerManager';
import { userReducer } from '@/entities/User';
import { uiReducer } from '@/entities/UI/UI';
import { authReducer } from '@/entities/Auth';

export function createReduxStore(
    initialState?: StateSchemaI,
    asyncReducers?: ReducersMapObject<StateSchemaI>,
) {
    const rootReducers: ReducersMapObject<StateSchemaI> = {
        ...asyncReducers,
        authData: authReducer,
        user: userReducer,
        ui: uiReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchemaI>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
