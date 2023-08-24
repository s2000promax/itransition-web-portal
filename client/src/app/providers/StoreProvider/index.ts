import { StoreProvider } from './ui/StoreProvider';
import { AppDispatch, createReduxStore } from './config/store';
import type {
    StateSchemaI,
    ThunkConfig,
    StateSchemaKey,
    ReduxStoreWithManager,
} from './config/stateSchema.interface';

export { StoreProvider, createReduxStore };

export type {
    StateSchemaI,
    AppDispatch,
    ThunkConfig,
    ReduxStoreWithManager,
    StateSchemaKey,
};
