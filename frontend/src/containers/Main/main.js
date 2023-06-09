import React, {  useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import {MathJax} from 'better-react-mathjax'
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

class MathJaxProvider extends MathJax.Provider {
  hasNodes = true
}

class Keygen {
  constructor() {
    this.userKey = 0
    this.anonKey = 0
  }

  user() {
    const key = `user${this.userKey}`
    this.userKey += 1
    return key
  }

  anonymous() {
    const key = `user${this.anonKey}`
    this.anonKey += 1
    return key
  }
}

const keygen = new Keygen()

const Main = (props) =>  {

  useEffect(() =>{
    if (props.toast !== newProps.toast) {
      toast(newProps.toast.message, newProps.toast.options)
    }
  })

  userRoutes = [
    <Route exact path="/selfassessment/edit/:selfAssessmentId" render={({ match }) => <SelfAssessmentFormPage edit match={match} />} key={keygen.user()} />,
    <Route exact path="/selfassessment/preview/:selfAssessmentId" render={({ match }) => <SelfAssessmentFormPage preview edit={false} match={match} />} key={keygen.user()} />,
    <Route exact path="/selfassessment/create/:courseInstanceId/:type" render={({ match }) => <SelfAssessmentFormPage edit new match={match} />} key={keygen.user()} />,
    <Route exact path="/selfassessment/response/:selfAssessmentId" render={({ match }) => <SelfAssessmentFormPage edit={false} match={match} />} key={keygen.user()} />,
    <Route path="/selfassessment/list/:selfAssesmentId" render={({ match }) => <SelfAssesmentListPage selfAssesmentId={Number(match.params.selfAssesmentId)} />} key={keygen.user()} />,
    <Route exact path="/selfassessment/:courseId" component={SelfAssessmentPage} key={keygen.user()} />,
    <Route path="/selfassessment" component={SelfAssessmentPage} key={keygen.user()} />,
    <Route exact path="/user/course/:courseId" component={UserPage} key={keygen.user()} />,
    <Route exact path="/user/course/:courseId/tasksAndPeople" component={CourseTasksPage} key={keygen.user()} />,
    <Route exact path="/user" component={UserPage} key={keygen.user()} />,
    <Route path="/course/:id" component={CoursePage} key={keygen.user()} />,
    <Route path="/tasks-responses/upload/:courseId" component={UploadResponsesPage} key={keygen.user()} />,
    <Route exact path="/courses/create" component={CreateCoursePage} key={keygen.user()} />,
    <Route path="/admin" component={AdminPage} key={keygen.user()} />,
    <Route exact path="/courses/register" component={RegisterRedirect} key={keygen.user()} />,
    <Route component={HomePage} key={keygen.user()} />
  ]

  anonymousRoutes = [
    <Route path="/courses/matrix/:id" component={MatrixPage} key={keygen.anonymous()} />,
    <Route exact path="/courses" component={CourseListPage} key={keygen.anonymous()} />,
    <Route exact path="/" component={HomePage} key={keygen.anonymous()} />
  ]


    return (
      <main>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
        />
        <MathJaxProvider>
          <Routes>
            {anonymousRoutes}
            {userRoutes}
          </Routes>
        </MathJaxProvider>
      </main>
    )
}

Main.propTypes = {
  toast: PropTypes.shape({
    message: PropTypes.string,
    options: PropTypes.object
  }).isRequired,
  user: PropTypes.shape({
    role: PropTypes.string
  }).isRequired
}

const mapStateToProps = state => ({
  toast: state.toast,
  user: state.user
})

export default withRouter(connect(mapStateToProps, null)(Main))
