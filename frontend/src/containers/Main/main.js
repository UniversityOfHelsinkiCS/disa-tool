import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { MathJaxContext } from 'better-react-mathjax'
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

const Main = (props) => {
    const [toastState, setToastState] = useState({ message: '', options: {} })
    useEffect(() => {
        if (toastState !== props.toast) {
            toast(props.toast.message, props.toast.options)
        }
        setToastState(props.toast)
    }, [])

    const userRoutes = [
        <Route
            exact
            path="/selfassessment/edit/:selfAssessmentId"
            element={<SelfAssessmentFormPage edit />}
            key={keygen.user()}
        />,
        <Route
            exact
            path="/selfassessment/preview/:selfAssessmentId"
            element={<SelfAssessmentFormPage preview edit={false} />}
            key={keygen.user()}
        />,
        <Route
            exact
            path="/selfassessment/create/:courseInstanceId/:type"
            element={<SelfAssessmentFormPage edit new />}
            key={keygen.user()}
        />,
        <Route
            exact
            path="/selfassessment/response/:selfAssessmentId"
            element={<SelfAssessmentFormPage edit={false} />}
            key={keygen.user()}
        />,
        <Route
            path="/selfassessment/list/:selfAssesmentId"
            element={<SelfAssesmentListPage />}
            key={keygen.user()}
        />,
        <Route
            exact
            path="/selfassessment/:courseId"
            element={<SelfAssessmentPage></SelfAssessmentPage>}
            key={keygen.user()}
        />,
        <Route
            path="/selfassessment"
            element={<SelfAssessmentPage></SelfAssessmentPage>}
            key={keygen.user()}
        />,
        <Route
            exact
            path="/user/course/:courseId"
            element={<UserPage></UserPage>}
            key={keygen.user()}
        />,
        <Route
            exact
            path="/user/course/:courseId/tasksAndPeople"
            element={<CourseTasksPage></CourseTasksPage>}
            key={keygen.user()}
        />,
        <Route
            exact
            path="/user"
            element={<UserPage></UserPage>}
            key={keygen.user()}
        />,
        <Route
            path="/course/:id"
            element={<CoursePage></CoursePage>}
            key={keygen.user()}
        />,
        <Route
            path="/tasks-responses/upload/:courseId"
            element={<UploadResponsesPage></UploadResponsesPage>}
            key={keygen.user()}
        />,
        <Route
            exact
            path="/courses/create"
            element={<CreateCoursePage></CreateCoursePage>}
            key={keygen.user()}
        />,
        <Route
            path="/admin"
            element={<AdminPage></AdminPage>}
            key={keygen.user()}
        />,
        <Route
            exact
            path="/courses/register"
            element={<RegisterRedirect></RegisterRedirect>}
            key={keygen.user()}
        />,
        <Route element={<HomePage></HomePage>} key={keygen.user()} />,
    ]

    const anonymousRoutes = [
        <Route
            path="/courses/matrix/:id"
            element={<MatrixPage></MatrixPage>}
            key={keygen.anonymous()}
        />,
        <Route
            exact
            path="/courses"
            element={<CourseListPage></CourseListPage>}
            key={keygen.anonymous()}
        />,
        <Route
            exact
            path="/"
            element={<HomePage></HomePage>}
            key={keygen.anonymous()}
        />,
    ]

    return (
        <main>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
            />
            <MathJaxContext>
                <Routes>
                    {anonymousRoutes}
                    {userRoutes}
                </Routes>
            </MathJaxContext>
        </main>
    )
}

Main.propTypes = {
    toast: PropTypes.shape({
        message: PropTypes.string,
        options: PropTypes.object,
    }).isRequired,
    user: PropTypes.shape({
        role: PropTypes.string,
    }).isRequired,
}

const mapStateToProps = (state) => ({
    toast: state.toast,
    user: state.user,
})

export default connect(mapStateToProps, null)(Main)
