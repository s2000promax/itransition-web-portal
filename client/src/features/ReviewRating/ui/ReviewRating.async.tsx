import { lazy, Suspense } from 'react';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { ReviewRatingProps } from './ReviewRating';

const ReviewRatingLazy = lazy(() => import('./ReviewRating'));

export const ReviewRatingAsync = (props: ReviewRatingProps) => (
    <Suspense
        fallback={
            <Skeleton
                width="100%"
                height={140}
            />
        }
    >
        <ReviewRatingLazy {...props} />
    </Suspense>
);
