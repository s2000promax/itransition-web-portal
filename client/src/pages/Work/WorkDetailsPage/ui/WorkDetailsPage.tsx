import { memo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './WorkDetailsPage.module.scss';
import { Page } from '@/widgets/Page';
import {
    FeedBackContainer,
    RecommendationReviewsContainer,
    WorkDetailsContainer,
} from '@/features/WorkDetailsPage';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { VStack } from '@/shared/UI-kit/Stack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import { workReducer } from '@/entities/Work';
import { useParams } from 'react-router-dom';
import { workDetailsPageReducer } from '@/entities/UI/WorkDetailsPage';

export interface WorkDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    workDetailsPage: workDetailsPageReducer,
    work: workReducer,
};

const WorkDetailsPage = ({ className }: WorkDetailsPageProps) => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    const content = (
        <>
            <BrowserView>
                <StickyContentLayout
                    content={
                        <Page
                            className={classNames(cls.WorkDetailsPage, {}, [
                                className,
                            ])}
                            data-testid="WorkDetailsPage"
                        >
                            <VStack
                                gap="16"
                                max
                            >
                                <WorkDetailsContainer workId={id} />
                                <FeedBackContainer workId={id} />
                            </VStack>
                        </Page>
                    }
                    right={
                        <VStack gap="24">
                            <RecommendationReviewsContainer workId={id} />
                        </VStack>
                    }
                />
            </BrowserView>
            <MobileView>
                <Page
                    className={classNames(cls.WorkDetailsPage, {}, [className])}
                    data-testid="WorkDetailsPage"
                >
                    <VStack
                        gap="16"
                        max
                    >
                        <WorkDetailsContainer workId={id} />
                        <FeedBackContainer workId={id} />
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

export default memo(WorkDetailsPage);
