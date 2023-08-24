import { StoreProvider } from './ui/StoreProvider';
import { AppDispatch, createReduxStore } from './config/store';
import type {
    StateSchemaI,
    ThunkConfig,
    StateSchemaKeyT,
    ReduxStoreWithManagerI,
} from './config/stateSchema.interface';

export { StoreProvider, createReduxStore };

export type {
    StateSchemaI,
    AppDispatch,
    ThunkConfig,
    ReduxStoreWithManagerI,
    StateSchemaKeyT,
};
