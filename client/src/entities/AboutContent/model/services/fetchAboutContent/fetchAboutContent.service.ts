import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AboutContent } from '@/entities/AboutContent/model/types/aboutContent.interface';
import { getLanguageSelector } from '@/entities/UI/UI';

export const fetchAboutContentService = createAsyncThunk<
    AboutContent,
    void,
    ThunkConfig<string>
>('about/fetchAboutContent', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;
    const language = getLanguageSelector(getState());

    try {
        const response = await extra.api.get('about', {
            params: {
                _lang: language,
            },
        });

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Failed to get about content');
    }
});
