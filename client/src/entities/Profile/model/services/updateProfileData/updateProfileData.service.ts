import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProfileI } from '../../types/profile.interface';
import { ValidateProfileEnums } from '../../enums/validateProfileEnums';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm.selector';
import { validateProfileData } from '../validateProfileData/validateProfileData.service';

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
        const response = await extra.api.put<ProfileI>('user', formData);

        if (response.status !== 200) {
            return rejectWithValue([ValidateProfileEnums.SERVER_ERROR]);
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue([ValidateProfileEnums.SERVER_ERROR]);
    }
});
