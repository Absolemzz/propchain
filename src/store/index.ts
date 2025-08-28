import { configureStore } from '@reduxjs/toolkit'
import propertiesReducer from './slices/propertiesSlice'
import transactionsReducer from './slices/transactionsSlice'

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    transactions: transactionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch