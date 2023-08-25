import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProfileI } from '../../types/profile.interface';
import { ValidateProfileEnums } from '../../enums/validateProfileEnums';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm.selector';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
    ProfileI,
    void,
    ThunkConfig<ValidateProfileEnums[]>
>('profile/updateProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const formData = getProfileForm(getState());

    const errors = validateProfileData(formData);

    if (errors.length) {
        return rejectWithValue(errors);
    }

    try {
        const response = await extra.api.put<ProfileI>(
            `/profile/${formData?.id}`,
            formData,
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue([ValidateProfileEnums.SERVER_ERROR]);
    }
});
