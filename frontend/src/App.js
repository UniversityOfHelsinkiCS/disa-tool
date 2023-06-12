import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Sentry from '@sentry/browser'

import { getUserAction } from './actions/actions'
import { getUser } from './api/persons'
import Nav from './containers/Nav/navbar'
import Main from './containers/Main/main'
import LocalizeWrapper from './containers/Localize/LocalizeWrapper'
import './i18n'

function App({ user }) {
    const [sessionAliveInterval, setSessionAliveInterval] = useState(null)

    useEffect(() => {
        getUserAction()
        const tempAliveInterval = setInterval(async () => {
            try {
                await getUser()
            } catch (e) {}
        }, 60 * 1000)
        setSessionAliveInterval(tempAliveInterval)

        return () => {
            if (sessionAliveInterval !== null) {
                clearInterval(sessionAliveInterval)
                setSessionAliveInterval(null)
            }
        }
    }, [])

    const onErrorHandler = (err) => {
        Sentry.configureScope((context) => {
            context.setUser({ id: user.id, username: user.name })
        })
        Sentry.captureException(err)
    }

    return (
        <ErrorBoundary onError={onErrorHandler}>
            <LocalizeProvider>
                <LocalizeWrapper>
                    <Nav />
                    <Main />
                </LocalizeWrapper>
            </LocalizeProvider>
        </ErrorBoundary>
    )
}

App.propTypes = {
    user: PropTypes.shape({ name: PropTypes.string, id: PropTypes.number })
        .isRequired,
    getUserAction: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(App)
