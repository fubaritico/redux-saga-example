import './styles/global.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from '@Redux/store'
// eslint-disable-next-line import/no-extraneous-dependencies
import { PersistGate } from 'redux-persist/integration/react'
import App from '@Components/App'

const container = document?.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
