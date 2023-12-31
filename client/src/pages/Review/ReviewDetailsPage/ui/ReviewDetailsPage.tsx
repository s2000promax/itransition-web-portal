import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
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
    CommentsContainer,
    ReviewDetailsContainer,
    TagsContainer,
    UserOwnerReviewInfoContainer,
    WorkInfoContainer,
} from '@/features/ReviewDetailsPage';
import { WorkRating } from '@/features/WorkRating';
import { RecommendationsList } from '@/features/RecommendationsList';
import { workReducer } from '@/entities/Work';
import { useSelector } from 'react-redux';
import { getUserDataSelector } from '@/entities/User';
import { fetchReviewByIdService, reviewReducer } from '@/entities/Review';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';

export interface ReviewDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    reviewDetailsPage: reviewDetailsPageReducer,
    review: reviewReducer,
    work: workReducer,
};

const ReviewDetailsPage = (props: ReviewDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const isAuth = useSelector(getUserDataSelector);

    if (!id) {
        return null;
    }

    useEffect(() => {
        dispatch(fetchReviewByIdService(id));
    }, [id]);

    const content = (
        <>
            <BrowserView>
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
                                {isAuth && <WorkRating reviewId={id} />}
                                <RecommendationsList reviewId={id} />
                                <CommentsContainer id={id} />
                            </VStack>
                        </Page>
                    }
                    right={
                        <VStack gap="24">
                            <UserOwnerReviewInfoContainer />
                            <WorkInfoContainer />
                            <TagsContainer />
                        </VStack>
                    }
                />
            </BrowserView>
            <MobileView>
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
                        {isAuth && <WorkRating reviewId={id} />}
                        <RecommendationsList reviewId={id} />
                        <CommentsContainer id={id} />
                    </VStack>
                </Page>
            </MobileView>
        </>
    );

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ReviewDetailsPage);
