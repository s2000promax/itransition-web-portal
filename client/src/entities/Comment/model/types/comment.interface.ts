import { UserI } from '@/entities/User';

export interface CommentI {
    id?: string;
    userId: string;
    reviewId: string;
    createdAt?: Date;
    content: string;
    user?: UserI;
}

export interface CommentSchemaI {
    data?: CommentI;
    form?: CommentI;
    commentList?: CommentI[];
    isLoading: boolean;
    error?: string;
}
