import React, { useEffect, useState } from 'react'
import { Container, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
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
            if (props.error) {
                props.dispatchClearError()
            }
        }
    }, [])

    const createOrEdit = async (e, { id, assessment }) => {
        if (assessment) {
            setState({ new: true, courseInstanceId: id, type: assessment })
        } else {
            setState({ edit: true, assessmentId: id })
        }
    }

    const { role } = props
    if (props.error || (props.role && props.role !== 'TEACHER')) {
        return redirect('/user/')
    }
    if (state.new) {
        return redirect(
            `/selfassessment/create/${state.courseInstanceId}/${state.type}`
        )
    }

    if (state.edit) {
        return redirect(`/selfassessment/edit/${state.assessmentId}`)
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

export default connect(mapStateToProps, mapDispatchToProps)(SelfAssessmentPage)
