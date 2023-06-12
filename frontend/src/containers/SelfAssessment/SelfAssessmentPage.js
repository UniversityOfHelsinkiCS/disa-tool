import React, { useEffect, useState } from 'react'
import { Container, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { redirect } from 'react-router'
import { useParams } from 'react-router-dom'
import EditOrNewForm from './Components/EditOrNewform'

import {
    getUserCoursesAction,
    getUserSelfAssesments,
    getCourseInstanceDataAction,
    resetErrorAction,
} from '../../actions/actions'

const SelfAssessmentPage = (props) => {
    const params = useParams()
    const [state, setState] = useState({
        new: false,
        type: '',
        edit: false,
        courseInstanceId: '',
        assessmentId: '',
    })

    const getCourseInstanceData = async (props) => {
        if (!props.role) {
            await props.dispatchGetCourseInstanceData(params.courseId)
        }
    }

    useEffect(() => {
        if (!props.role) {
            getCourseInstanceData()
        }
        props.dispatchGetUsercourses()
        props.dispatchGetUserSelfAssessments()

        return () => {
            if (this.props.error) {
                this.props.dispatchClearError()
            }
        }
    }, [])

    createOrEdit = async (e, { id, assessment }) => {
        if (assessment) {
            this.setState({ new: true, courseInstanceId: id, type: assessment })
        } else {
            this.setState({ edit: true, assessmentId: id })
        }
    }

    const { role } = this.props
    if (
        this.props.error ||
        (this.props.role && this.props.role !== 'TEACHER')
    ) {
        return redirect('/user/')
    }
    if (this.state.new) {
        return redirect(
            `/selfassessment/create/${this.state.courseInstanceId}/${this.state.type}`
        )
    }

    if (this.state.edit) {
        return redirect(`/selfassessment/edit/${this.state.assessmentId}`)
    }

    return (
        <Container>
            <div className="selfAssesmentCreateForm">
                {!role ? (
                    <Loader active />
                ) : (
                    <EditOrNewForm
                        courses={props.courses}
                        dropDownCourse={props.courseDropdownOptions}
                        selectedCourse={props.match.params.courseId}
                        selfAssessments={props.selfAssessments}
                        handleSubmit={createOrEdit}
                    />
                )}
            </div>
        </Container>
    )
}

const createOptions = (data) => {
    const options = []
    data.map((d) => options.push({ value: d.id, text: d.name }))
    return options
}
const mapStateToProps = (state) => ({
    role: state.instance.courseRole,
    courses: state.courses,
    courseDropdownOptions: createOptions(state.courses),
    selfAssesmentDropdownOptions: createOptions(
        state.selfAssesment.userSelfAssesments
    ),
    formData: state.selfAssesment.createForm,
    selfAssessments: state.selfAssesment.userSelfAssesments,
    error: state.error.redirect,
})

const mapDispatchToProps = (dispatch) => ({
    dispatchGetUsercourses: () => dispatch(getUserCoursesAction()),
    dispatchGetUserSelfAssessments: () => dispatch(getUserSelfAssesments()),
    dispatchGetCourseInstanceData: (courseId) =>
        dispatch(getCourseInstanceDataAction(courseId)),
    dispatchClearError: () => dispatch(resetErrorAction()),
})

SelfAssessmentPage.propTypes = {
    courseDropdownOptions: PropTypes.arrayOf(PropTypes.shape()),
    courses: PropTypes.arrayOf(PropTypes.shape()),
    match: PropTypes.shape({
        params: PropTypes.shape({
            courseId: PropTypes.string,
        }).isRequired,
    }).isRequired,
    selfAssessments: PropTypes.arrayOf(PropTypes.shape()),
    dispatchGetUsercourses: PropTypes.func.isRequired,
    dispatchGetUserSelfAssessments: PropTypes.func.isRequired,
    dispatchGetCourseInstanceData: PropTypes.func.isRequired,
    dispatchClearError: PropTypes.func.isRequired,
    error: PropTypes.bool,
    role: PropTypes.string,
}

SelfAssessmentPage.defaultProps = {
    courses: [],
    selfAssessments: [],
    courseDropdownOptions: [],
    role: null,
    error: false,
}

export default withLocalize(
    connect(mapStateToProps, mapDispatchToProps)(SelfAssessmentPage)
)
