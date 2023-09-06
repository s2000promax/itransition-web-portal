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
import { RegisterSchemaI } from '@/entities/Auth/model/types/register.interface';
import { AuthSchemaI } from '@/entities/Auth/model/types/auth.interface';

export interface StateSchemaI {
    authData: AuthSchemaI;
    user: UserSchemaI;
    ui: UISchemaI;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    loginForm?: LoginSchemaI;
    registerForm?: RegisterSchemaI;

    profile?: ProfileSchemaI;
    review?: ReviewSchemaI;

    reviewDetailsPage?: ReviewDetailsPageSchemaI;
    reviewsPage?: ReviewsPageSchemaI;
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
