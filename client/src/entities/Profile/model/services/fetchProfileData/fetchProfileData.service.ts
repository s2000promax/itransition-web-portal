import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ProfileI } from '../../types/profile.interface';

export const fetchProfileData = createAsyncThunk<
    ProfileI,
    string,
    ThunkConfig<string>
>('profile/fetchProfileData', async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<ProfileI>(`/profile/${profileId}`);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
