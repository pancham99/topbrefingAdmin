import { createSlice } from '@reduxjs/toolkit';
import { createApiThunkPublic, createApiThunkPrivate } from '../../api/axios';

const getInitialState = () => {
  const adminData = localStorage.getItem('adminData');
  return {
    loginData: adminData ? JSON.parse(adminData) : null,
    isAuthenticated: !!adminData,
    loading: false,
    error: null,

    // 👇 email verification state
    emailVerified: false,

    forgotPasswordSuccess: false,
    resetPasswordSuccess: false,
    changePasswordSuccess: false,


  };
};

export const login = createApiThunkPublic('login', '/auth/login', 'POST');
export const getProfile = createApiThunkPublic("getProfile", "/auth/profile", "GET");

export const register = createApiThunkPublic('register', '/auth/register', 'POST');
// ✅ ADD THIS
export const verifyEmail = createApiThunkPublic('verifyEmail', '/auth/verify-email', 'GET');

export const logout = createApiThunkPrivate('logout', '/auth/logout', 'POST');

export const verifyUserEmail = createApiThunkPrivate(
  "users/verifyEmail",
  "/auth/verify-email",
  "POST"
);

// 🔑 Forgot Password
export const forgotPassword = createApiThunkPublic(
  "auth/forgotPassword",
  "/auth/forgot-password",
  "POST"
);

// 🔁 Reset Password (token based)
export const resetPassword = createApiThunkPublic(
  "auth/resetPassword",
  "/auth/reset-password",
  "POST"
);


// 🔒 Change Password (logged-in user)
export const changePassword = createApiThunkPrivate(
  "auth/changePassword",
  "/auth/change-password",
  "POST"
);






const authSlice = createSlice({
  name: 'authorization',
  initialState: getInitialState(),
  reducers: {
    resetEmailVerification: (state) => {
      state.emailVerified = false;

      state.forgotPasswordSuccess = false;
      state.resetPasswordSuccess = false;
      state.changePasswordSuccess = false;
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

    // logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.loginData = null;
        state.isAuthenticated = false;
        localStorage.removeItem('adminData');
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });


    /* ========== FORGOT PASSWORD ========== */
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });


    /* ========== RESET PASSWORD ========== */
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });


    /* ========== CHANGE PASSWORD ========== */
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.changePasswordSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });

  },
});

export const { resetEmailVerification } = authSlice.actions;

export default authSlice.reducer;