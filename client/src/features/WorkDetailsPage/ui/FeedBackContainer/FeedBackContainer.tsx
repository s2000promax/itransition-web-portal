import { memo } from 'react';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Text } from '@/shared/UI-kit/Text';
import { VStack } from '@/shared/UI-kit/Stack';
import { FeedBackList } from './FeedBackList/FeedBackList';
import { CommentI } from '@/entities/Comment';

interface FeedBackContainerProps {
    className?: string;
    id?: string;
}

export const FeedBackContainer = memo((props: FeedBackContainerProps) => {
    const { className, id } = props;
    const { t } = useTranslation('workDetailsPage');
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
