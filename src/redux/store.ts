import {configureStore} from '@reduxjs/toolkit'
import identitiesReducer from '@Redux/identities/reducer'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import createSagaMiddleware, {END, Saga, Task} from 'redux-saga'
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";
import { Store } from 'redux';

const persistConfig = {
  key: 'app:sagas',
  storage,
}

const sagaMiddleware = createSagaMiddleware()

const middlewares = []
middlewares.push(sagaMiddleware)

const enhancers = [...middlewares]

const persistedReducer = persistReducer(persistConfig, identitiesReducer)

type StoreWithSaga = Store & ToolkitStore & {
  close: () => void
  runSaga: <S extends Saga>(saga: S,  ...args: Parameters<S>) => Task
}

export const configureStoreWithSaga = (): StoreWithSaga => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(enhancers).concat(logger),
  }) as StoreWithSaga

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  return store
}



export const action = (type: string) => ({type})
