import { RouteProps } from 'react-router-dom';
import { UserRolesEnums } from '@/entities/User';

export type AppRoutesPropsT = RouteProps & {
    authOnly?: boolean;
    roles?: UserRolesEnums[];
};
