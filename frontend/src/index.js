import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import * as Sentry from '@sentry/browser'

import App from './App'

import store from './store'

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

try {
    if (IS_PRODUCTION) {
        Sentry.init({
            dsn: 'https://3936f4ca15844c059959d21c01d5e401@toska.cs.helsinki.fi/7',
        }) // eslint-disable-line
    }
} catch (e) {
    console.log(e) // eslint-disable-line
}

const container = document.getElementById('app')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
