import {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { rtkApi } from '@/shared/api/rtk.api';
import { UserSchemaI } from '@/entities/User';
import { UISchemaI } from '@/entities/UI/UI';
import { LoginSchemaI } from '@/entities/Auth';
import { ProfileSchemaI } from '@/entities/Profile';
import { ReviewSchemaI } from '@/entities/Review';
import { ReviewsPageSchemaI } from 'src/entities/UI/ReviewsPage';
import { ReviewDetailsPageSchemaI } from 'src/entities/UI/ReviewDetailsPage';
import { CommentFormSchemaI } from 'src/entities/UI/CommentForm';

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

export type StateSchemaKeyT = keyof StateSchemaI;
export type MountedReducers = OptionalRecord<StateSchemaKeyT, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchemaI>;
    reduce: (
        state: StateSchemaI,
        action: AnyAction,
    ) => CombinedState<StateSchemaI>;
    add: (key: StateSchemaKeyT, reducer: Reducer) => void;
    remove: (key: StateSchemaKeyT) => void;
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManagerI extends EnhancedStore<StateSchemaI> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchemaI;
}
