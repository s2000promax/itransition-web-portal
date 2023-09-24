import { ReviewI } from '@/entities/Review';
import { FeedbackI } from '@/entities/FeedBack';

export interface FeedbackSchemaI {
    data?: FeedbackI[];
    isLoading?: boolean;
    error?: string;
}

export interface RecommendationReviewsSchemaI {
    data?: ReviewI[];
    isLoading?: boolean;
    error?: string;
}

export interface WorkDetailsPageSchemaI {
    feedbackList: FeedbackSchemaI;
    recommendationReviewList: RecommendationReviewsSchemaI;
}
