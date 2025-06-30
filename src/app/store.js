import { configureStore } from '@reduxjs/toolkit'
import advertisementReducer from '../features/advertisement/advertisementSlice'

export const store = configureStore({
    reducer:{
        advertisement: advertisementReducer,
    }
})