import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './ReviewDetailsPage.module.scss';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import { reviewDetailsPageReducer } from '@/entities/UI/ReviewDetailsPage';
import { Page } from '@/widgets/Page';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { VStack } from '@/shared/UI-kit/Stack';

import {
    AdditionalInfoContainer,
    CommentsContainer,
    ReviewDetailsContainer,
} from '@/features/ReviewDetailsPage';
import { ReviewRating } from '@/features/ReviewRating';
import { RecommendationsList } from '@/features/RecommendationsList';

export interface ReviewDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    reviewDetailsPage: reviewDetailsPageReducer,
};

const ReviewDetailsPage = (props: ReviewDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <StickyContentLayout
                content={
                    <Page
                        className={classNames(cls.ReviewDetailsPage, {}, [
                            className,
                        ])}
                    >
                        <VStack
                            gap="16"
                            max
                        >
                            <ReviewDetailsContainer />
                            <ReviewRating reviewId={id} />
                            <RecommendationsList />
                            <CommentsContainer id={id} />
                        </VStack>
                    </Page>
                }
                right={<AdditionalInfoContainer />}
            />
        </DynamicModuleLoader>
    );
};

export default memo(ReviewDetailsPage);