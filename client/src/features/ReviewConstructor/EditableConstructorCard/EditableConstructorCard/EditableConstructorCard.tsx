import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';

import { ConstructorCard } from './ConstructorCard';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';

import { EditableConstructorCardHeader } from '../EditableConstructorCardHeader/EditableConstructorCardHeader';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import {
    fetchReviewByIdService,
    getReviewDataSelector,
    getReviewErrorSelector,
    getReviewIsLoadingSelector,
    getReviewValidateErrorsSelector,
    reviewActions,
    reviewReducer,
    ValidateReviewEnums,
} from '@/entities/Review';
import { getUserExtendDataSelector } from '@/entities/User';
import { fetchProfileData, getProfileData } from '@/entities/Profile';
import {
    fetchWorkByIdService,
    getWorkDataSelector,
    workReducer,
} from '@/entities/Work';
import { tagReducer } from '@/entities/Tag';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';

interface EditableConstructorCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    review: reviewReducer,
    work: workReducer,
    tag: tagReducer,
};

export const EditableConstructorCard = memo(
    (props: EditableConstructorCardProps) => {
        const { className, id } = props;
        const { t } = useTranslation('reviewConstructor');
        const dispatch = useAppDispatch();
        const isLoading = useSelector(getReviewIsLoadingSelector);
        const error = useSelector(getReviewErrorSelector);
        const workId = useSelector(getUserExtendDataSelector);
        const reviewData = useSelector(getReviewDataSelector);
        const workData = useSelector(getWorkDataSelector);
        const ownerUser = useSelector(getProfileData);
        const validateErrors = useSelector(getReviewValidateErrorsSelector);

        const validateErrorTranslates = {
            [ValidateReviewEnums.SERVER_ERROR]: t('validator.server'),
            [ValidateReviewEnums.NO_DATA]: t('validator.empty'),
            [ValidateReviewEnums.INCORRECT_DATA]: t('validator.incorrect'),
        };

        const handleFetchWorkById = useCallback(() => {
            dispatch(fetchWorkByIdService(workId!));
        }, [dispatch]);

        const debounceFetchWorkById = useDebounce(handleFetchWorkById, 300);

        const handleFetchReviewById = useCallback(() => {
            dispatch(fetchReviewByIdService(id));
        }, [dispatch]);

        const debounceFetchReviewById = useDebounce(handleFetchReviewById, 300);

        const handleFetchProfileData = useCallback(() => {
            dispatch(fetchProfileData(reviewData?.ownerId!));
        }, []);

        const debounceFetchProfileData = useDebounce(
            handleFetchProfileData,
            300,
        );

        useInitialEffect(() => {
            if (workId) {
                debounceFetchWorkById();
            }

            if (id) {
                debounceFetchReviewById();
            }

            if (reviewData) {
                debounceFetchProfileData();
            } else {
            }
        });

        return (
            <DynamicModuleLoader reducers={reducers}>
                <VStack
                    gap="16"
                    max
                    className={classNames('', {}, [className])}
                >
                    <EditableConstructorCardHeader
                        isNewReview={!id}
                        reviewData={reviewData}
                        workData={workData}
                        ownerId={ownerUser?.id}
                    />
                    {validateErrors?.length &&
                        validateErrors.map((err) => (
                            <Text
                                key={err}
                                variant="error"
                                text={validateErrorTranslates[err]}
                                data-testid="EditableConstructorCard.Error"
                            />
                        ))}
                    <ConstructorCard
                        isNewReview={!id}
                        isLoading={isLoading}
                        error={error}
                    />
                </VStack>
            </DynamicModuleLoader>
        );
    },
);
