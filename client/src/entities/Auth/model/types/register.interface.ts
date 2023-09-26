import { UserI } from '@/entities/User';

export interface RegisterSchemaI
    extends Pick<UserI, 'email' | 'firstName' | 'lastName' | 'password'> {
    isLoading: boolean;
    error?: string;
    isFormValid?: boolean;
}
