import { UserI } from '@/entities/User';

export interface LoginSchemaI extends Pick<UserI, 'email' | 'password'> {
    isLoading: boolean;
    error?: string;
}
