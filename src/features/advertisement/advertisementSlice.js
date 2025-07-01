import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../config/config'
import { data } from 'autoprefixer';

export const addAdvertisement = createAsyncThunk("advertisement/add", async ({ fd, token }, { rejectWithValue }) => {
  
    try {
        const { data } = await axios.post(`${base_url}/api/advertisement/add`, fd, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data, "data from add advertisement slice");

        return data;
    } catch (error) {
        return rejectWithValue(err.response?.data?.message || 'Something went wrong');
    }
}
)

export const fetchAdvertisements = createAsyncThunk("advertisement/fetchAll", async (token, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${base_url}/api/advertisement/getall`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(data, "data from advertisement slice");
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch advertisements');
    }
});

export const deleteAdvertisement = createAsyncThunk("advertisement/delete", async ({ _id, token }, { rejectWithValue }) => {
    try {
        await axios.delete(`${base_url}/api/advertisement/delete/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return _id; 
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete advertisement');
    }
});

export const updateAdvertisement = createAsyncThunk(
  "advertisement/update",
  async ({ _id, fd, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${base_url}/api/advertisement/update/${_id}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
       return data.updatedAdvertisement || data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update advertisement");
    }
  }
);


export const fetchAdvertisementById = createAsyncThunk("advertisement/fetchById", async ({ _id, token }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${base_url}/api/advertisement/get/${_id}`, {
            headers: {  
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(data, "data from advertisement slice by id");
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
            });
    },
})

export const { resetAdvertisementState } = advertisementSlice.actions;
export default advertisementSlice.reducer;