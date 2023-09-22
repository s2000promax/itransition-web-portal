import { UserI } from '@/entities/User';

export interface DashboardSchemaI {
    usersList?: UserI[];
    isLoading: boolean;
    error?: string;
}
