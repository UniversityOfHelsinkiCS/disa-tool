import React, { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { connect, useSelector } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import MathJax from 'react-mathjax'
import 'react-toastify/dist/ReactToastify.css'

import HomePage from '../Home/HomePage'
import MatrixPage from '../Course/MatrixPage'
import CoursePage from '../Course/CoursePage'
import SelfAssessmentPage from '../SelfAssessment/SelfAssessmentPage'
import SelfAssessmentFormPage from '../SelfAssessmentForm/SelfAssessmentFormPage'
import AdminPage from '../Admin/AdminPage'
import UserPage from '../User/UserPage'
import CourseListPage from '../CourseList/CourseListPage'
import CreateCoursePage from '../CreateCourse/CreateCoursePage'
import UploadResponsesPage from '../TaskResponses/UploadResponsesPage'
import SelfAssesmentListPage from '../SelfAssesmentList/SelfAssesmentListPage'
import RegisterRedirect from '../CourseList/components/RegisterRedirect'
import CourseTasksPage from '../Course/CourseTasksPage'

const Main = () => {
  const [keyState, setKeyState] = useState({ user: 0, anon: 0 })
  const toastData = useSelector((state) => state.toast)

  useEffect(() => {
    toast(toastData.message, toastData.options)
  }, [toastData])

  const getAnonymousKey = () => {
    const key = `user${keyState.anon}`
    setKeyState({ anon: keyState.anon + 1 })
    return key
  }

  const getUserKey = () => {
    const key = `user${keyState.user}`
    setKeyState({ user: keyState.user + 1 })
    return key
  }

  const userRoutes = [
    <Route
      exact
      path="/course-instance/:courseInstanceId/selfassessment/edit/:selfAssessmentId"
      render={({ match }) => <SelfAssessmentFormPage edit match={match} />}
      key={() => getUserKey()}
    />,
    <Route
      exact
      path="/course-instance/:courseInstanceId/selfassessment/preview/:selfAssessmentId"
      render={({ match }) => <SelfAssessmentFormPage preview edit={false} match={match} />}
      key={() => getUserKey()}
    />,
    <Route
      exact
      path="/selfassessment/create/:courseInstanceId/:type"
      render={({ match }) => <SelfAssessmentFormPage edit newAssessment match={match} />}
      key={() => getUserKey()}
    />,
    <Route
      exact
      path="/selfassessment/response/:selfAssessmentId"
      render={({ match }) => <SelfAssessmentFormPage edit={false} match={match} />}
      key={() => getUserKey()}
    />,
    <Route
      path="/selfassessment/list/:selfAssesmentId"
      render={({ match }) => <SelfAssesmentListPage selfAssesmentId={Number(match.params.selfAssesmentId)} />}
      key={() => getUserKey()}
    />,
    <Route exact path="/selfassessment/:courseId" component={SelfAssessmentPage} key={() => getUserKey()} />,
    <Route path="/selfassessment" component={SelfAssessmentPage} key={() => getUserKey()} />,
    <Route exact path="/user/course/:courseId" component={UserPage} key={() => getUserKey()} />,
    <Route
      exact
      path="/user/course/:courseId/tasksAndPeople"
      render={(props) => <CourseTasksPage {...props} />}
      key={() => getUserKey()}
    />,
    <Route exact path="/user" component={UserPage} key={() => getUserKey()} />,
    <Route path="/course/:id" component={CoursePage} key={() => getUserKey()} />,
    <Route path="/tasks-responses/upload/:courseId" component={UploadResponsesPage} key={() => getUserKey()} />,
    <Route exact path="/courses/create" component={CreateCoursePage} key={() => getUserKey()} />,
    <Route path="/admin" component={AdminPage} key={() => getUserKey()} />,
    <Route exact path="/courses/register" component={RegisterRedirect} key={() => getUserKey()} />,
    <Route component={HomePage} key={() => getUserKey()} />,
  ]

  const anonymousRoutes = [
    <Route path="/courses/matrix/:id" render={(props) => <MatrixPage {...props} />} key={() => getAnonymousKey()} />,
    <Route exact path="/courses" key={() => getAnonymousKey()}>
      <CourseListPage />
    </Route>,
    <Route exact path="/" component={HomePage} key={() => getAnonymousKey()} />,
  ]
  return (
    <main>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
        <MathJax.Provider>
          <Switch>
            {anonymousRoutes}
            {userRoutes}
          </Switch>
        </MathJax.Provider>
      </ErrorBoundary>
    </main>
  )
}

/*
Main.propTypes = {
  toast: PropTypes.shape({
    message: PropTypes.string,
    options: PropTypes.object
  }).isRequired,
  user: PropTypes.shape({
    role: PropTypes.string
  }).isRequired
} */

export default withRouter(connect()(Main))
