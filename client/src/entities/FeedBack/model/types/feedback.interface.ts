import { UserI } from '@/entities/User';

export interface FeedbackI {
    createdAt: Date;
    rate: number;
    feedback: string;
    user: UserI;
}
