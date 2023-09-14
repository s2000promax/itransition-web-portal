import { memo, useCallback, Suspense } from 'react';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/libs/classNames/classNames';
import {
    fetchCommentsByReviewIdService,
    getReviewComments,
    getCommentsIsLoadingSelector,
    addCommentForReviewService,
} from '@/entities/UI/ReviewDetailsPage';
import { Text } from '@/shared/UI-kit/Text';
import { VStack } from '@/shared/UI-kit/Stack';
import { Loader } from '@/shared/UI-kit/Loader';
import { CommentList } from '@/features/Comment';
import { CommentForm } from '@/features/UI/CommentForm';
import { FeedBackList } from '@/features/WorkDetailsPage/ui/FeedBackContainer/FeedBackList/FeedBackList';
import { CommentI } from '@/entities/Comment';

interface FeedBackContainerProps {
    className?: string;
    id?: string;
}

export const FeedBackContainer = memo((props: FeedBackContainerProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const feedbackList: CommentI[] = [];
    const feedbackListIsLoading = false;
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        // dispatch(fetchCommentsByReviewIdService(id));
    });

    return (
        <VStack
            gap="16"
            max
            className={classNames('', {}, [className])}
        >
            <Text
                size="l"
                title={t('comments')}
            />

            <FeedBackList
                isLoading={feedbackListIsLoading}
                comments={feedbackList}
            />
        </VStack>
    );
});
