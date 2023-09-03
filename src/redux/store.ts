import { configureStore } from '@reduxjs/toolkit'
import identitiesReducer from '@Redux/identities/reducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'app:relevanc',
  storage,
}

const persistedReducer = persistReducer(persistConfig, identitiesReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export const persistor = persistStore(store)
