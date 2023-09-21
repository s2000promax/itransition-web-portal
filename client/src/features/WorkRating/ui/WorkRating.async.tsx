import { lazy, Suspense } from 'react';
import { Skeleton } from '@/shared/UI-kit/Skeleton';
import { WorkRatingProps } from './WorkRating';

const WorkRatingLazy = lazy(() => import('./WorkRating'));

export const WorkRatingAsync = (props: WorkRatingProps) => (
    <Suspense
        fallback={
            <Skeleton
                width="100%"
                height={140}
            />
        }
    >
        <WorkRatingLazy {...props} />
    </Suspense>
);
