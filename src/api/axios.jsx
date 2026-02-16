import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

let isLiveUrl = false;

export const BASE_URL = isLiveUrl
  ? "http://localhost:5000/api/v1"
  : "http://localhost:5000/api/v1";

export const SOCKET_URL = isLiveUrl
  ? " http://localhost:5000/socket"
  : "http://localhost:5000/socket";

// ------------------------------------------------------
// Public axios instance
// ------------------------------------------------------
const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ------------------------------------------------------
// Private axios instance
// ------------------------------------------------------
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// axiosPrivate.interceptors.request.use(
//   (config) => {
//     const adminData = localStorage.getItem("adminData");

//     let parsedToken = null;
//     try {
//       parsedToken = JSON.parse(adminData);
//     } catch {
//       console.error("Failed to parse adminData from localStorage");
//     }
    

//     const token = parsedToken?.token;

//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


axiosPrivate.interceptors.request.use(
  (config) => {
    const adminData = localStorage.getItem("adminData");

    if (adminData) {
      try {
        const parsed = JSON.parse(adminData);

        const token =
          parsed?.accessToken ||
          parsed?.data?.accessToken ||
          parsed?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error("Invalid adminData in localStorage");
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ------------------------------------------------------
// PUBLIC API Thunk
// ------------------------------------------------------
export const createApiThunkPublic = (typePrefix, url, method = "GET") =>
  createAsyncThunk(typePrefix, async (payload = {}, { rejectWithValue }) => {
    try {
      const res = await axiosPublic.request({
        url,
        method,
        data: method !== "GET" ? payload : undefined,
        params: method === "GET" ? payload : undefined,
      });

      return res.data;
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);

      if (err.response?.data?.code === 1503) {
        window.location.href = "/TechnicalErrorPage";
      }

      return rejectWithValue(err?.response?.data || { message: err.message });
    }
  });

// ------------------------------------------------------
// PRIVATE API Thunk
// ------------------------------------------------------
// export const createApiThunkPrivate = (typePrefix, url, method = "GET") =>
//   createAsyncThunk(typePrefix, async (payload = {}, { rejectWithValue }) => {
//     try {
//       const res = await axiosPrivate.request({
//         url,
//         method,
//         data: method !== "GET" ? payload : undefined,
//         params: method === "GET" ? payload : undefined,
//       });

//       return res?.data;
//     } catch (err) {
//       const errorData = err.response?.data || {
//         message: err.message,
//         code: 500,
//       };

//       console.error("Private API Error:", errorData);

//       if (errorData.code === 1401) {
//         localStorage.clear();
//         sessionStorage.clear();
//         window.location.href = "/login";
//         return rejectWithValue({
//           message: "Session expired. Please login again.",
//         });
//       }

//       toast.error(errorData?.message || "Something went wrong.");

//       return rejectWithValue(errorData);
//     }
//   });

export const createApiThunkPrivate = (typePrefix, url, method = "GET") =>
  createAsyncThunk(typePrefix, async (payload = {}, { rejectWithValue }) => {
    try {
      const finalUrl =
        typeof url === "function" ? url(payload) : url;

      const res = await axiosPrivate.request({
        url: finalUrl,
        method,
        data: method !== "GET" ? payload : undefined,
        params:
          method === "GET" && typeof payload === "object"
            ? payload
            : undefined,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  });


// ------------------------------------------------------
// Extra Reducer Helper
// ------------------------------------------------------
export const createExtraReducersForThunk = (
  builder,
  thunk,
  stateKey,
  onFulfilled
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.loading = false;
      state[stateKey] = action.payload;
      if (onFulfilled) {
        onFulfilled(state, action);
      }
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? action.error?.message;
    });
};

// ------------------------------------------------------
// AXIOS IMAGE UPLOAD INSTANCE
// ------------------------------------------------------
const axiosImage = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

axiosImage.interceptors.request.use(
  (config) => {
    const adminData = localStorage.getItem("adminData");

    let parsedToken = null;
    try {
      parsedToken = JSON.parse(adminData);
    } catch {
      console.error("Failed to parse adminData from localStorage");
    }

    const token = parsedToken?.token;

    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosImage.interceptors.response.use(
  (response) => {
    if (response?.data?.code === 3) {
      localStorage.removeItem("adminData");
      window.location.href = "/login";
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: "Network error. Please try again." });
    }

    switch (error.response.status) {
      case 500:
        return Promise.reject({
          message: "Internal server error. Please try again later.",
        });
      default:
        return Promise.reject(error.response.data);
    }
  }
);

// ------------------------------------------------------
// FIXED: Image Upload Thunk (previously broken)
// ------------------------------------------------------
export const createApiThunkPrivateImage = (typePrefix, apiPath) =>
  createAsyncThunk(typePrefix, async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosImage.post(apiPath, formData);

      return res.data;
    } catch (error) {
      console.error("Image Upload Error:", error);
      toast.error(error?.message || "Failed to upload image");
      return rejectWithValue(error);
    }
  });
