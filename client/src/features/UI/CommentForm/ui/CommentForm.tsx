import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/libs/classNames/classNames';
import cls from './CommentForm.module.scss';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';
import {
    commentFormActions,
    commentFormReducer,
    getCommentFormText,
    getCommentFormError,
} from '@/entities/UI/CommentForm';
import { HStack } from '@/shared/UI-kit/Stack';
import { Input } from '@/shared/UI-kit/Input';
import { Button } from '@/shared/UI-kit/Button';
import { Card } from '@/shared/UI-kit/Card';

export interface CommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    commentForm: commentFormReducer,
};

const CommentForm = memo((props: CommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation('comment_form');
    const text = useSelector(getCommentFormText);
    const error = useSelector(getCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(commentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card
                padding="24"
                border="partial"
                fullWidth
            >
                <HStack
                    data-testid="AddCommentForm"
                    justify="between"
                    max
                    gap="16"
                    className={classNames(cls.CommentForm, {}, [className])}
                >
                    <Input
                        className={cls.input}
                        placeholder={t('Enter comment text')}
                        value={text}
                        data-testid="AddCommentForm.Input"
                        onChange={onCommentTextChange}
                    />
                    <Button
                        data-testid="AddCommentForm.Button"
                        onClick={onSendHandler}
                    >
                        {t('Send')}
                    </Button>
                </HStack>
            </Card>
        </DynamicModuleLoader>
    );
});

export default CommentForm;
