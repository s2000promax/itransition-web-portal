import { UserI } from '@/entities/User';

export interface CommentI {
    id: string;
    user: UserI;
    text: string;
}
