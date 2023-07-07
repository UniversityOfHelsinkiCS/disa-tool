import React, { useState, useEffect } from 'react'
import { connect , useDispatch} from 'react-redux'
import { useParams } from 'react-router'
import PropTypes from 'prop-types'
import { Grid, Dimmer, Loader } from 'semantic-ui-react'
import CourseHeader from '../Course/components/header/CourseHeader'
import ManageCoursePeople from '../User/ManageCoursePeople'
import TaskResponseEdit from '../User/TaskResponseEdit'
import InfoBox from '../../utils/components/InfoBox'

import { getCourseInstanceTasksAction, getCourseInstanceDataAction } from '../../actions/actions'

export const CourseTasksPage = (props) => {
const [loading, setLoading] = useState(false)
const { id } = useParams()
const dispatch = useDispatch()
  const { course } = props
  const { user } = props

  useEffect(() => {
    const asyncFunction = async () => {
    const instanceHasData = course.people.length !== 0
    setLoading(true)
    // If for some reason the redux instance is not set,
    // fetch the course data first, before getting the tasks
    // and set it to redux state
    if (!instanceHasData) {
      dispatchEvent(getCourseInstanceDataAction(id))
    }
    dispatch(getCourseInstanceTasksAction(instanceHasData ? course : props.course))
    setLoading(false)
  }
  asyncFunction()
  },[])
console.log('wow')
    const isTeacher = course.courseRole === 'TEACHER'
    const isGlobalTeacher = user.role === 'TEACHER' || user.role === 'ADMIN'

    const { tasks } = course
    const students = course.id && isTeacher ?
      course.people.filter(person =>
        person.course_instances[0].course_person.role !== 'TEACHER') : []

    return (
      <div>
        {loading ?
          <Dimmer active={loading} inverted>
            <Loader inverted />
          </Dimmer>
          :
          <Grid container>
            <Grid.Row>
              <Grid.Column>
                <CourseHeader
                  instance={course}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <InfoBox translationid="TasksAndPeople" buttonProps={{ floated: 'right' }} />
              </Grid.Column>
            </Grid.Row>
            {isGlobalTeacher &&
              <Grid.Row>
                <Grid.Column>
                  <ManageCoursePeople
                    activeCourse={course}
                    people={course.people}
                  />
                </Grid.Column>
              </Grid.Row>
            }
            <Grid.Row>
              <Grid.Column>
                <TaskResponseEdit
                  tasks={tasks}
                  students={students}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        }
      </div>
    )
  }
/*
CourseTasksPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      course: PropTypes.shape({
        id: PropTypes.number.isRequired
      }),
      courseId: PropTypes.number.isRequired
    })
  }).isRequired,
  course: PropTypes.shape({
    people: PropTypes.arrayOf(PropTypes.shape())
  }),
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    studentnumber: PropTypes.string,
    role: PropTypes.string
  }).isRequired,
  getCourseInstanceDataAction: PropTypes.func.isRequired,
  getCourseInstanceTasksAction: PropTypes.func.isRequired
}
*/

export default connect()(CourseTasksPage)
