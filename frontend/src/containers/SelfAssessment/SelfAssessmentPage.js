import React, { useState, useEffect } from 'react'
import { Container, Loader } from 'semantic-ui-react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router'
import EditOrNewForm from './Components/EditOrNewform'

import {
  getUserCoursesAction,
  getUserSelfAssesments,
  getCourseInstanceDataAction,
  resetErrorAction,
} from '../../actions/actions'

export const SelfAssessmentPage = (props) => {
  const role = useSelector((state) => state.instance.courseRole)
  const user = useSelector((state) => state.user)
  const selfAssesments = useSelector((state) => state.selfAssesment.userSelfAssesments)
  const courses = useSelector((state) => state.courses)
  const error = useSelector((state) => state.error.redirect)
  const [newAssessment, setNewAssessment] = useState(false)
  const [type, setType] = useState('')
  const [edit, setEdit] = useState(false)
  const [courseInstanceId, setCourseInstanceId] = useState('')
  const [assessmentId, setAssessmentId] = useState('')
  const { courseId } = useParams()

  const dispatch = useDispatch()
  useEffect(() => {
    const asyncMount = async () => {
      if (!role) {
        await getCourseInstanceDataAction(courseId, dispatch)
      }
      getUserCoursesAction(dispatch)
      getUserSelfAssesments(user, dispatch)
    }
    asyncMount()
    return () => {
      if (error) {
        resetErrorAction(dispatch)
      }
    }
  }, [])

  const createOptions = (data) => {
    const options = []
    data.map((d) => options.push({ value: d.id, text: d.name }))
    return options
  }

  const createOrEdit = async (e, { id, assessment }) => {
    if (assessment) {
      setNewAssessment(true)
      setType(assessment)
      setCourseInstanceId(id)
    } else {
      setEdit(true)
      setAssessmentId(id)
    }
  }
  if (error || (props.role && props.role !== 'TEACHER')) {
    return <Redirect to="/user" />
  }
  if (newAssessment) {
    return <Redirect to={`/selfassessment/create/${courseInstanceId}/${type}`} />
  }

  if (edit) {
    return <Redirect to={`/course-instance/${courseInstanceId}/selfassessment/edit/${assessmentId}`} />
  }

  const courseDropdownOptions = createOptions(courses)

  return (
    <Container>
      <div className="selfAssesmentCreateForm" data-testid="self-assessment-page">
        {!role ? (
          <Loader active />
        ) : (
          <EditOrNewForm
            courses={courses}
            dropDownCourse={courseDropdownOptions}
            selectedCourse={courseId}
            selfAssessments={selfAssesments}
            handleSubmit={createOrEdit}
          />
        )}
      </div>
    </Container>
  )
}
/*
SelfAssessmentPage.propTypes = {
  courseDropdownOptions: PropTypes.arrayOf(PropTypes.shape()),
  courses: PropTypes.arrayOf(PropTypes.shape()),
  match: PropTypes.shape({
    params: PropTypes.shape({
      courseId: PropTypes.string
    }).isRequired
  }).isRequired,
  selfAssessments: PropTypes.arrayOf(PropTypes.shape()),
  dispatchGetUsercourses: PropTypes.func.isRequired,
  dispatchGetUserSelfAssessments: PropTypes.func.isRequired,
  dispatchGetCourseInstanceData: PropTypes.func.isRequired,
  dispatchClearError: PropTypes.func.isRequired,
  error: PropTypes.bool,
  role: PropTypes.string
}
*/

export default connect()(SelfAssessmentPage)
