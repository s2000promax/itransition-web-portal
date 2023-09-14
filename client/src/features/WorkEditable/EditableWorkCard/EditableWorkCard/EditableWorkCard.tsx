import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/libs/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/libs/hooks/useInitialEffect/useInitialEffect';

import { WorkCard } from '../../WorkCard';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader';

import { EditableWorkCardHeader } from '@/features/WorkEditable/EditableWorkCard/EditableWorkCardHeader/EditableWorkCardHeader';
import { VStack } from '@/shared/UI-kit/Stack';
import { Text } from '@/shared/UI-kit/Text';
import { uploadService } from '@/entities/Upload';
import {
    getWorkErrorSelector,
    getWorkFormSelector,
    getWorkIsLoadingSelector,
    getWorkReadonlySelector,
    getWorkValidateErrorsSelector,
    ValidateWorkEnums,
    workActions,
    workReducer,
} from '@/entities/Work';
import { fetchWorkDataService } from '@/entities/Work/model/services/fetchWorkData/fetchWorkData.service';

interface EditableWorkCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    work: workReducer,
};

export const EditableWorkCard = memo((props: EditableWorkCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('work');

    const dispatch = useAppDispatch();
    const formData = useSelector(getWorkFormSelector);
    const isLoading = useSelector(getWorkIsLoadingSelector);
    const error = useSelector(getWorkErrorSelector);
    const readonly = useSelector(getWorkReadonlySelector);
    const validateErrors = useSelector(getWorkValidateErrorsSelector);

    const validateErrorTranslates = {
        [ValidateWorkEnums.SERVER_ERROR]: t('error.save'),
        [ValidateWorkEnums.NO_DATA]: t('error.no_data'),
        [ValidateWorkEnums.INCORRECT_WORK_DATA]: t('error.work_data'),
    };

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchWorkDataService(id));
        }
    });

    const onChangeTitle = useCallback(
        (value?: string) => {
            dispatch(workActions.updateWork({ title: value || '' }));
        },
        [dispatch],
    );

    const onChangeAuthor = useCallback(
        (value?: string) => {
            dispatch(workActions.updateWork({ author: value || '' }));
        },
        [dispatch],
    );

    const onChangeDescription = useCallback(
        (value?: string) => {
            dispatch(workActions.updateWork({ description: value || '' }));
        },
        [dispatch],
    );

    const onChangeCover = useCallback(
        (file: File) => {
            dispatch(uploadService(file)).then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    const url = Object.values(
                        response.payload as { url: string },
                    ).join();

                    dispatch(
                        workActions.updateWork({
                            cover: url || '',
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
                <EditableWorkCardHeader />
                {validateErrors?.length &&
                    validateErrors.map((err) => (
                        <Text
                            key={err}
                            variant="error"
                            text={validateErrorTranslates[err]}
                            data-testid="EditableWorkCard.Error"
                        />
                    ))}
                <WorkCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeTitle={onChangeAuthor}
                    onChangeAuthor={onChangeTitle}
                    onChangeDescription={onChangeDescription}
                    onChangeCover={onChangeCover}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
