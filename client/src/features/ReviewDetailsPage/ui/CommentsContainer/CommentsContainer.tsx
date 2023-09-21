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
import { getUserDataSelector } from '@/entities/User';

interface CommentsContainerProps {
    className?: string;
    id?: string;
}

export const CommentsContainer = memo((props: CommentsContainerProps) => {
    const { className, id } = props;
    const { t } = useTranslation('comment');
    const isAuth = useSelector(getUserDataSelector);
    const comments = useSelector(getReviewComments.selectAll);
    const commentsIsLoading = useSelector(getCommentsIsLoadingSelector);
    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForReviewService(text));
        },
        [dispatch],
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByReviewIdService(id));
    });

    return (
        <VStack
            gap="16"
            max
            className={classNames('', {}, [className])}
        >
            <Text
                size="l"
                title={t('Comments')}
            />
            {isAuth && (
                <Suspense fallback={<Loader />}>
                    <CommentForm onSendComment={onSendComment} />
                </Suspense>
            )}
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </VStack>
    );
});
