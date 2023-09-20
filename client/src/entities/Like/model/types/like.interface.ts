export interface LikeI {
    userId: string;
    reviewId: string;
    createdAt?: string;
}

export interface LikeSchemaI {
    data?: LikeI;
    isLoading: boolean;
    error?: string;
}
