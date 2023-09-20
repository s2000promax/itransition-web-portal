import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';
import { StateSchemaI } from '../config/stateSchema.interface';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchemaI>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchemaI>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props;

    const store = createReduxStore(
        initialState as StateSchemaI,
        asyncReducers as ReducersMapObject<StateSchemaI>,
    );

    return <Provider store={store}>{children}</Provider>;
};
