import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { reviewActions } from '@/entities/Review';

type UploadServiceProps = File;

type UploadResponse = {
    url: string;
};

export const uploadService = createAsyncThunk<
    UploadResponse,
    UploadServiceProps,
    ThunkConfig<string>
>('upload/image', async (file, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await extra.api.post<UploadResponse>(
            'upload',
            formData,
        );

        if (response.status !== 201) {
            return rejectWithValue('error');
        }

        // dispatch(reviewActions.updateReviewCover(response.data.url));

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
