import { createSlice } from '@reduxjs/toolkit';
import { createApiThunkPublic } from '../../api/axios';

const getInitialState = () => {
  const adminData = localStorage.getItem('adminData');
  return {
    loginData: adminData ? JSON.parse(adminData) : null,
    isAuthenticated: !!adminData,
    loading: false,
    error: null,

    // 👇 email verification state
    emailVerified: false,


  };
};

export const login = createApiThunkPublic('login', '/auth/login', 'POST');
export const getProfile = createApiThunkPublic("getProfile", "/auth/profile", "GET");

export const register = createApiThunkPublic('register', '/auth/register', 'POST');
// ✅ ADD THIS
export const verifyEmail = createApiThunkPublic('verifyEmail', '/auth/verify-email', 'GET');

const authSlice = createSlice({
  name: 'authorization',
  initialState: getInitialState(),
  reducers: {
    resetEmailVerification: (state) => {
      state.emailVerified = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Regular login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loginData = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('adminData', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.isAuthenticated = false;
        state.loginData = null;
        localStorage.removeItem('adminData');
      });

    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

    // ---------------- VERIFY EMAIL ----------------
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.emailVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetEmailVerification } = authSlice.actions;

export default authSlice.reducer;