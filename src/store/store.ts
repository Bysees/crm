import { configureStore } from '@reduxjs/toolkit'
import { callsReducer } from './slices'

const store = configureStore({
  reducer: {
    calls: callsReducer,
  },
})

export { store }