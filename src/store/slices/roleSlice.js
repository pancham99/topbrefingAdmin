import { createSlice } from "@reduxjs/toolkit";
import { createApiThunkPrivate } from "../../api/axios";

const initialState = {
  roles: [],
  selectedRole: null,
  loading: false,
  error: null,
};

// API
export const getAllRoles = createApiThunkPrivate(
  "roles/getAll",
  "/auth/admin/all/roles",
  "GET"
);

export const updateUserRole = createApiThunkPrivate(
  "roles/updateUserRole",
  "/auth/admin/users/roleupdate",
  "POST"
);

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    selectRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    resetRoles: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload?.data?.roles || [];
      })
      .addCase(getAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || action.error.message;
      });

      // updateUserRole

      
  },
});

export const { selectRole, resetRoles } = roleSlice.actions;
export default roleSlice.reducer;
