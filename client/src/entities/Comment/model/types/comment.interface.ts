import { UserI } from '@/entities/User';

export interface CommentI {
    id: string;
    ownerId: string;
    content: string;
    date: Date;
    user: UserI;
}
