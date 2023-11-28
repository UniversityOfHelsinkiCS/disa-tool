import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import * as Sentry from '@sentry/browser'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

import App from './App'

import store from './store'

import './i18n'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

try {
  if (IS_PRODUCTION) {
    Sentry.init({ dsn: 'https://3936f4ca15844c059959d21c01d5e401@toska.cs.helsinki.fi/7' }) // eslint-disable-line
  }
} catch (e) {
  console.log(e) // eslint-disable-line
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<div>Loading... </div>}>
          <App />
        </Suspense>
      </I18nextProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
)
