import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../config/config'

export const addAdvertisement = createAsyncThunk("advertisement/add", async ({ formData, token }, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${base_url}/api/advertisement/add`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return data;
    } catch (error) {
        return rejectWithValue(err.response?.data?.message || 'Something went wrong');
    }
}
)

const advertisementSlice = createSlice({
    name: 'advertisement',
    initialState: {
        advertisements: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetAdvertisementState: (state) => {
            state.advertisements = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addAdvertisement.pending, (state) => {
                state.loading = true;
            })
            .addCase(addAdvertisement.fulfilled, (state, action) => {
                state.loading = false;
                state.advertisements.push(action.payload);
            })
            .addCase(addAdvertisement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export const { resetAdvertisementState } = advertisementSlice.actions;
export default advertisementSlice.reducer;