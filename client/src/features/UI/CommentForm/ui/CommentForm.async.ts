import { FC, lazy } from 'react';
import { CommentFormProps } from './CommentForm';

export const CommentFormAsync = lazy<FC<CommentFormProps>>(
    () => import('./CommentForm'),
);
