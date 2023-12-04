import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { withRouter } from 'react-router-dom'
import { useDispatch, connect, useSelector } from 'react-redux'
import { LocalizeProvider } from 'react-localize-redux'
import * as Sentry from '@sentry/browser'
import { getUserAction } from './actions/actions'
import { getUser } from './api/persons'
import Nav from './containers/Nav/navbar'
import Main from './containers/Main/main'
import LocalizeWrapper from './containers/Localize/LocalizeWrapper'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  let sessionAliveInterval = null

  const getUserAsync = async () => {
    await getUserAction(dispatch)
  }

  const logError = (err) => {
    // eslint-disable-next-line no-console
    console.log(err)
    Sentry.configureScope((context) => {
      context.setUser({ id: user.id, username: user.name })
    })
    Sentry.captureException(err)
  }

  useEffect(() => {
    getUserAsync()
    sessionAliveInterval = setInterval(async () => {
      try {
        await getUser()
      } catch (e) {
        logError(e)
      }
    }, 60 * 1000)
    return () => {
      if (sessionAliveInterval !== null) {
        clearInterval(sessionAliveInterval)
        sessionAliveInterval = null
      }
    }
  }, [])

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>} onError={logError}>
      <LocalizeProvider>
        <LocalizeWrapper>
          <Nav />
          <Main />
        </LocalizeWrapper>
      </LocalizeProvider>
    </ErrorBoundary>
  )
}
/*
App.propTypes = {
  user: PropTypes.shape({ name: PropTypes.string, id: PropTypes.number }).isRequired,
  getUserAction: PropTypes.func.isRequired,
}
*/
// const mapStateToProps = ({ user }) => ({ user })

export default withRouter(connect()(App))
