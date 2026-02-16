import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import roleReducer from './slices/roleSlice'

// import blockchainSlice from './slices/blockchainSlice'
// import urlTypeSlice from './slices/urlTypeSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    roles: roleReducer,
    // blockchain:blockchainSlice,
    // urlType:urlTypeSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})