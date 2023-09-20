export interface RatingI {
    userId: string;
    workId: string;
    rate: number;
    feedback?: string;
    createdAt?: string;
}

export interface RatingSchemaI {
    data?: RatingI;
    isLoading: boolean;
    error?: string;
}
