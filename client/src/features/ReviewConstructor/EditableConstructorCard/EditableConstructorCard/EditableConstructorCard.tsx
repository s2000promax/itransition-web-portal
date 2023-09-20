import { memo } from 'react';
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
    reviewReducer,
    ValidateReviewEnums,
} from '@/entities/Review';
import { getUserExtendDataSelector } from '@/entities/User';
import { fetchProfileData, getProfileData } from '@/entities/Profile';
import {
    getWorkDataSelector,
    workReducer,
    fetchWorkByIdService,
} from '@/entities/Work';
import { tagReducer } from '@/entities/Tag';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    review: reviewReducer,
    work: workReducer,
    tag: tagReducer,
};

export const EditableConstructorCard = memo(
    (props: EditableProfileCardProps) => {
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
            [ValidateReviewEnums.SERVER_ERROR]: t('error.save'),
            [ValidateReviewEnums.NO_DATA]: t('error.no_data'),
            [ValidateReviewEnums.INCORRECT_DATA]: t('error.incorrect_data'),
        };

        useInitialEffect(() => {
            if (workId) {
                dispatch(fetchWorkByIdService(workId));
            }

            if (id) {
                dispatch(fetchReviewByIdService(id));
            }

            if (reviewData) {
                dispatch(fetchProfileData(reviewData.ownerId));
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
                        isLoading={isLoading}
                        error={error}
                    />
                </VStack>
            </DynamicModuleLoader>
        );
    },
);
