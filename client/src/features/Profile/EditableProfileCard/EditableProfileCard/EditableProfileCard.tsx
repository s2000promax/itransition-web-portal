import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';

import { ProfileCard } from '../../ProfileCard';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';

import {
    fetchProfileData,
    fetchUserReviewListService,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    profileReducer,
    ValidateProfileEnums,
} from '@/entities/Profile';

import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { uploadService } from '@/entities/Upload';
import { ProfileUserReviewListTable } from '@/features/Profile/ProfileUserReviewListTable/ui/ProfileUserReviewListTable';
import { getUserDataSelector, isUserRoleAdminSelector } from '@/entities/User';
import { useDebounce } from '@/shared/libs/hooks/useDebounce/useDebounce';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const currentUser = useSelector(getUserDataSelector);
    const isAdmin = useSelector(isUserRoleAdminSelector);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ValidateProfileEnums.SERVER_ERROR]: t('validator.server'),
        [ValidateProfileEnums.NO_DATA]: t('validator.empty'),
        [ValidateProfileEnums.INCORRECT_USER_DATA]: t('validator.incorrect'),
    };

    const handleFetchProfileData = useCallback(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    }, [dispatch, id]);
    const debounceFetchProfileData = useDebounce(handleFetchProfileData, 300);

    const handleFetchUserReviewList = useCallback(() => {
        if (id) {
            dispatch(fetchUserReviewListService(id));
        }
    }, [dispatch, id]);
    const debounceFetchUserReviewList = useDebounce(
        handleFetchUserReviewList,
        300,
    );

    useInitialEffect(() => {
        if (id) {
            debounceFetchProfileData();

            if (id === currentUser?.id || isAdmin) {
                debounceFetchUserReviewList();
            }
        }
    });

    const onChangeFirstName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ firstName: value || '' }));
        },
        [dispatch],
    );

    const onChangeLastName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastName: value || '' }));
        },
        [dispatch],
    );

    const onChangeAvatar = useCallback(
        (file: File) => {
            dispatch(uploadService(file)).then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    const url = Object.values(
                        response.payload as { url: string },
                    ).join();

                    dispatch(
                        profileActions.updateProfile({
                            avatar: url || '',
                        }),
                    );
                }
            });
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="16"
                max
                className={classNames('', {}, [className])}
            >
                <EditableProfileCardHeader />
                {validateErrors?.length &&
                    validateErrors.map((err) => (
                        <Text
                            key={err}
                            variant="error"
                            text={validateErrorTranslates[err]}
                            data-testid="EditableProfileCard.Error"
                        />
                    ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                    onChangeAvatar={onChangeAvatar}
                />
                {(id === currentUser?.id || isAdmin) && (
                    <ProfileUserReviewListTable isLoading={isLoading} />
                )}
            </VStack>
        </DynamicModuleLoader>
    );
});
