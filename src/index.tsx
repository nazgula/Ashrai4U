import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-pinia'
import { AuthProvider, ModalProvider } from '@/core/context'

import { store } from '@/core/store'

import App from '@/App'

import reportWebVitals from './reportWebVitals'

import './i18n'
import '@/assets/styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <StrictMode>
  <Suspense fallback="...loading">
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </Suspense>,
  // </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
