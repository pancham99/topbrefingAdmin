import { createSlice } from "@reduxjs/toolkit";
import { createApiThunkPrivate } from "../../api/axios";

const initialState = {
    profile: null,
    selectedUser: null,
    list: [],
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0,
    },
    loadingProfile: false,
    loadingUsers: false,
    loadingSelectedUser: false,
    error: null,
};


// API
export const getProfile = createApiThunkPrivate(
    "users/getProfile",
    "/auth/profile",
    "GET"
);

export const updateProfile = createApiThunkPrivate("users/update", '/auth/updateprofile', 'PUT');
export const getAllUsers = createApiThunkPrivate("users/getAll", "/auth/admin/users", "GET");




export const getUserById = createApiThunkPrivate(
    "users/getById",
    ({ userId }) => `/auth/users/${userId}`,
    "GET"
);
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        resetUserState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;

                // 🔥 IMPORTANT FIX
                state.profile = action.payload?.data?.user || null;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || action.error.message;
            });

        // getAllUsers
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;

                console.log("USERS API DATA:", action.payload); // 🔍 DEBUG

                state.list = action.payload?.data?.users ?? [];
                state.pagination = action.payload?.data?.pagination ?? state.pagination;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || action.error.message;
            });

        //   updateUser
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload?.data?.user || null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || action.error.message;
            });

        // userdetals
        builder
            .addCase(getUserById.pending, (state) => {
                state.loadingSelectedUser = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loadingSelectedUser = false;
                state.selectedUser = action.payload?.data?.user || null;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loadingSelectedUser = false;
                state.error = action.payload?.message || action.error.message;
            });
    },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
