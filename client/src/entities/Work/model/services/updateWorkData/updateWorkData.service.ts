import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { WorkI } from '../../types/work.interface';
import { ValidateWorkEnums } from '../../enums/validateWork.enums';
import { getWorkFormSelector } from '../../selectors/getWorkForm/getWorkForm.selector';
import { validateWorkDataService } from '../../services/validateWorkData/validateWorkData.service';

export const updateWorkDataService = createAsyncThunk<
    WorkI,
    void,
    ThunkConfig<ValidateWorkEnums[]>
>('work/updateWorkData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const formData = getWorkFormSelector(getState());

    const errors = validateWorkDataService(formData);

    if (errors.length) {
        return rejectWithValue(errors);
    }

    try {
        const response = await extra.api.put<WorkI>('work', formData);

        if (response.status !== 200) {
            return rejectWithValue([ValidateWorkEnums.SERVER_ERROR]);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue([ValidateWorkEnums.SERVER_ERROR]);
    }
});
