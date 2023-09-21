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
import { ProfileSchemaI } from '@/entities/Profile';
import { ReviewSchemaI } from '@/entities/Review';
import { ReviewListPageSchemaI } from 'src/entities/UI/ReviewListPage';
import { ReviewDetailsPageSchemaI } from '@/entities/UI/ReviewDetailsPage';
import { CommentFormSchemaI } from '@/entities/UI/CommentForm';
import { AuthSchemaI, LoginSchemaI, RegisterSchemaI } from '@/entities/Auth';
import { WorkSchemaI } from '@/entities/Work';
import { WorkListPageSchemaI } from '@/entities/UI/WorkListPage';
import { RatingSchemaI } from '@/entities/Rating';
import { LikeSchemaI } from '@/entities/Like';
import { CommentSchemaI } from '@/entities/Comment';
import { TagSchemaI } from '@/entities/Tag';
import { DashboardSchemaI } from '@/entities/Dashboard';

export interface StateSchemaI {
    authData: AuthSchemaI;
    user: UserSchemaI;
    ui: UISchemaI;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    loginForm?: LoginSchemaI;
    registerForm?: RegisterSchemaI;

    profile?: ProfileSchemaI;
    work?: WorkSchemaI;
    review?: ReviewSchemaI;
    rating?: RatingSchemaI;
    like?: LikeSchemaI;
    comment?: CommentSchemaI;
    tag?: TagSchemaI;
    dashboard?: DashboardSchemaI;

    workListPage?: WorkListPageSchemaI;
    reviewDetailsPage?: ReviewDetailsPageSchemaI;
    reviewListPage?: ReviewListPageSchemaI;
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
