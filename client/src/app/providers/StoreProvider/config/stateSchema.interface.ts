import {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { ReviewsPageSchemaI } from '@/entities/ReviewsPage';
import { rtkApi } from '@/shared/api/rtk.api';
import { UserSchemaI } from '@/entities/User';
import { UISchemaI } from '@/entities/UI';
import { LoginSchemaI } from '@/entities/Auth';
import { ProfileSchemaI } from '@/entities/Profile';
import { ReviewSchemaI } from '@/entities/Review';
import { ReviewDetailsPageSchemaI } from '@/entities/ReviewDetailsPage';
import { CommentFormSchemaI } from '@/entities/CommentForm';

export interface StateSchemaI {
    user: UserSchemaI;
    ui: UISchemaI;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    loginForm?: LoginSchemaI;
    profile?: ProfileSchemaI;
    review?: ReviewSchemaI;
    reviewsPage?: ReviewsPageSchemaI;
    reviewsDetailsPage?: ReviewDetailsPageSchemaI;
    commentForm?: CommentFormSchemaI;
}

export type StateSchemaKey = keyof StateSchemaI;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchemaI>;
    reduce: (
        state: StateSchemaI,
        action: AnyAction,
    ) => CombinedState<StateSchemaI>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchemaI> {
    reducerManager: ReducerManager;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    state: StateSchemaI;
}
