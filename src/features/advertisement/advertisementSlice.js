import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axiosInstance'

export const addAdvertisement = createAsyncThunk("advertisement/add", async ({ fd }, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post('/api/advertisement/add', fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});

export const fetchAdvertisements = createAsyncThunk("advertisement/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get('/api/advertisement/getall');
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch advertisements');
    }
});

export const deleteAdvertisement = createAsyncThunk("advertisement/delete", async ({ _id }, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`/api/advertisement/delete/${_id}`);
        return _id; 
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete advertisement');
    }
});

export const updateAdvertisement = createAsyncThunk(
  "advertisement/update",
  async ({ _id, fd }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/api/advertisement/update/${_id}`, fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data.updatedAdvertisement || data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update advertisement");
    }
  }
);

export const update_ststus_advertisement = createAsyncThunk("advertisement/updateStatus",
    async ({ _id, status }, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.put(`/api/advertisement/status/${_id}`, { status });
        return data.updatedAdvertisement || data;   
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update advertisement status");   
    }
});

export const fetchAdvertisementById = createAsyncThunk("advertisement/fetchById", async ({ _id }, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`/api/advertisement/get/${_id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch advertisement by ID');
    }
});

const advertisementSlice = createSlice({
    name: 'advertisement',
    initialState: {
        advertisements: [],
        data: {},
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
            })
            .addCase(fetchAdvertisements.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdvertisements.fulfilled, (state, action) => {
                state.loading = false;
                state.advertisements = action.payload;
            })
            .addCase(fetchAdvertisements.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteAdvertisement.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAdvertisement.fulfilled, (state, action) => {
                state.loading = false;
                state.advertisements = state.advertisements.filter(ad => ad._id !== action.payload);
            })
            .addCase(deleteAdvertisement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateAdvertisement.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateAdvertisement.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.advertisements.findIndex(ad => ad._id === action.payload._id);
                if (index !== -1) {
                    state.advertisements[index] = action.payload;
                }
            })
            .addCase(updateAdvertisement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAdvertisementById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdvertisementById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchAdvertisementById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(update_ststus_advertisement.pending, (state) => {
                state.loading = true;
            })
            .addCase(update_ststus_advertisement.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.advertisements.findIndex(ad => ad._id === action.payload._id);
                if (index !== -1) {
                    state.advertisements[index] = action.payload;
                }
            })
            .addCase(update_ststus_advertisement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export const { resetAdvertisementState } = advertisementSlice.actions;
export default advertisementSlice.reducer;