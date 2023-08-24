import { EntityState } from '@reduxjs/toolkit';
import { ReviewI } from '@/entities/Review';
import { CommentI } from '@/entities/Comment';

export interface RecommendationsReviewsSchemaI extends EntityState<ReviewI> {
    isLoading?: boolean;
    error?: string;
}

export interface CommentsSchemaI extends EntityState<CommentI> {
    isLoading?: boolean;
    error?: string;
}
export interface ReviewDetailsPageSchemaI {
    comments: CommentsSchemaI;
    recommendations: RecommendationsReviewsSchemaI;
}
