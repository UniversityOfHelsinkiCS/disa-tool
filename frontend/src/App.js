import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Sentry from '@sentry/browser'

import { getUserAction } from './actions/actions'
import { getUser } from './api/persons'
import Nav from './containers/Nav/navbar'
import Main from './containers/Main/main'
import './i18n'

function App() {
    const [sessionAliveInterval, setSessionAliveInterval] = useState(null)
    const [user, setUser] = useState({})

    useEffect(() => {
        const userData = getUserAction()
        setUser(userData)
        const tempAliveInterval = setInterval(async () => {
            try {
                await getUser()
                // eslint-disable-next-line no-empty
            } catch (e) {}
        }, 60 * 1000)
        setSessionAliveInterval(tempAliveInterval)

        return () => {
            if (sessionAliveInterval !== null) {
                clearInterval(sessionAliveInterval)
                setSessionAliveInterval(null)
            }
        }
    }, [sessionAliveInterval])

    const onErrorHandler = (err) => {
        Sentry.configureScope((context) => {
            context.setUser({ id: user.id, username: user.name })
        })
        Sentry.captureException(err)
    }

    return (
        <ErrorBoundary
            fallbackRender={<div>error</div>}
            onError={onErrorHandler}
        >
            <Nav />
            <Main />
        </ErrorBoundary>
    )
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(App)
