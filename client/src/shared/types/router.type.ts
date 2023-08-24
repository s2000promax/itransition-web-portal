import { RouteProps } from 'react-router-dom';
import { UserRolesEnums } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRolesEnums[];
};
