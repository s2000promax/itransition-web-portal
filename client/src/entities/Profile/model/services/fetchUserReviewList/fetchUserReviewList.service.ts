import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ReviewI } from '@/entities/Review';
import { getProfileData } from '@/entities/Profile';

export const fetchUserReviewListService = createAsyncThunk<
    ReviewI[],
    string,
    ThunkConfig<string>
>('profile/fetchUserReviewList', async (userProfileId, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await extra.api.get<ReviewI[]>('user/myReviews', {
            params: {
                _userId: userProfileId,
            },
        });

        if (response.status !== 200) {
            return rejectWithValue('error');
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
