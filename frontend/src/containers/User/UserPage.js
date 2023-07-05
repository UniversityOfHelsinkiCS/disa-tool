import React, { useState,useEffect } from 'react'
import { connect,useDispatch } from 'react-redux'
import { Redirect, Link,useParams} from 'react-router-dom'
import { shape, string, arrayOf, func, number } from 'prop-types'
import { Accordion, Dimmer, Header, Grid, Item, Loader, Button } from 'semantic-ui-react'
import { withLocalize } from 'react-localize-redux'

import {
  getUserCoursesAction,
  getUserSelfAssesments,
  getCourseInstanceDataAction,
  toggleCourseActivityAction,
  toggleAssessmentAction,
  setAssessmentStatusAction,
  resetCourseInstanceAction
} from '../../actions/actions'
import CourseSideMenu from './CourseSideMenu'
import { ListTasks } from './ListTasks'
import CourseSelfAssessmentsList from './CourseSelfAssessmentsList'
import CourseInfo from './CourseInfo'
import Conditional from '../../utils/components/Conditional'
import InfoBox from '../../utils/components/InfoBox'

const UserPage = (props) => {
  const [loading, setLoading] = useState(false)
  const [selectedType, setSelectedType] = useState(undefined)
  const {courseId} = useParams()
  const dispatch = useDispatch()
  const { activeCourse, courses, user } = props
  
  let course = null
  useEffect(() => {
    const onMount = async () => {
      setLoading(true)
      dispatch(getUserCoursesAction())
      dispatch(getUserSelfAssesments())
      if (courseId) {
        dispatch(getCourseInstanceDataAction(courseId))
        }
        setLoading(false)
    }
    onMount()
    return(() => {
    if ( courseId && id) {
      dispatch(resetCourseInstanceAction)
    }
    })
  },[courseId])

  useEffect(() => {
    course = courses.find(c => c.id === courseId)
  },[courses])

  const t = id => props.translate(`UserPage.common.${id}`)

  const handleActivityToggle = async () => {
    props.dispatchToggleActivity(activeCourse.id)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const handleClick = async (e, { course }) => {
    // setState({ activeCourse: course })
    // Fetch all relevant course information: tasks with responses & assessments with responses.
    if (!loading && courseId) {
      dispatch(getCourseInstanceDataAction(course.id))
    }
  }


 const toggleAssessment = (e, { value }) => {
    switch (e.target.name) {
      case 'assessmentHidden':
        dispatch(setAssessmentStatusAction(value, [{ name: 'open', value: false }, { name: 'active', value: false }]))
        [{ name: 'open', value: false }, { name: 'active', value: false }]
        break
      case 'assessmentShown':
        dispatch(setAssessmentStatusAction(value, [{ name: 'open', value: false }, { name: 'active', value: true }]))
        [{ name: 'open', value: false }, { name: 'active', value: true }]
        break
      case 'assessmentOpen':
        dispatch(setAssessmentStatusAction(value, [{ name: 'open', value: true }, { name: 'active', value: true }]))
        [{ name: 'open', value: true }, { name: 'active', value: true }]
        break
      case 'feedbackOpen':
        props.dispatchToggleAssessment(value, 'show_feedback')
        break
      default:
        console.log('Something went wrong here now')
    }
  }


    const { self_assessments: assessments, tasks,id } = activeCourse
 /*   if (!courseId && activeCourse.id) {
      return <Redirect to={`/user/course/${activeCourse.id}`} />
    }

    if ( courseId && activeCourse.id && id) {
      return <Redirect to={`/courses?course=${courseId}&instance=${id}`} />
    }*/
    const isTeacher = activeCourse.courseRole === 'TEACHER'
    const isGlobalTeacher = user.role === 'TEACHER' || user.role === 'ADMIN'
    const students = activeCourse.id && isTeacher ?
      activeCourse.people.filter(person =>
        person.course_instances[0].course_person.role !== 'TEACHER') : []
    const teachers = activeCourse.id ?
      activeCourse.people.filter(person =>
        person.course_instances[0].course_person.role === 'TEACHER') : []
    return (
      <Grid padded="horizontally">
        <Dimmer active={loading} inverted>
          <Loader inverted />
        </Dimmer>
        <Grid.Row>
          <Grid.Column>
            {<Header as="h1">{t('hello')} {props.user && props.user.name}</Header>}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <CourseSideMenu
              courses={courses}
              activeCourse={activeCourse}
              handleChange={handleClick}
            />
          </Grid.Column>
          <Grid.Column width={13}>
            {activeCourse.id ?
              <Item>
                <Grid padded="horizontally" columns="equal">
                  <CourseInfo
                    course={activeCourse}
                    toggleActivation={handleActivityToggle}
                    teachers={teachers}
                    isTeacher={isTeacher}
                    isGlobalTeacher={isGlobalTeacher}
                  />
                  <Conditional visible={isTeacher || assessments.some(a => a.active)}>
                    <Grid.Row>
                      <Grid.Column>
                        <Item.Content>
                          <InfoBox translationid="UserPageSelfAssessments" buttonProps={{ floated: 'right' }} useCourseRole />
                          <Header as="h2">
                            {t('self_assessments')}
                          </Header>
                          <CourseSelfAssessmentsList
                            assesments={assessments}
                            isTeacher={isTeacher}
                            toggleAssessment={toggleAssessment}
                          />
                        </Item.Content>
                        <Conditional visible={isTeacher}>
                          <Button
                            as={Link}
                            to={`/selfassessment/create/${activeCourse.id}/category`}
                            basic
                            color="blue"
                            content={t('create_self_assessment_category')}
                            icon="plus"
                            circular
                            style={{ marginLeft: '10px' }}
                          />
                          <Button
                            as={Link}
                            to={`/selfassessment/create/${activeCourse.id}/objective`}
                            basic
                            color="blue"
                            content={t('create_self_assessment_target')}
                            icon="plus"
                            circular
                            style={{ marginLeft: '10px' }}
                          />
                        </Conditional>
                      </Grid.Column>
                    </Grid.Row>
                  </Conditional>
                  <Conditional visible={tasks.length > 0}>
                    <Grid.Row>
                      <Grid.Column>
                        <Item.Content>
                          <InfoBox translationid="UserPageTasks" buttonProps={{ floated: 'right' }} useCourseRole />
                          <Header as="h2">{t('tasks')}</Header>
                          <Accordion
                            defaultActiveIndex={-1}
                            styled
                            fluid
                            panels={[{
                              key: 'ListTasks',
                              title: t('open_task_list'),
                              content: {
                                key: 'tasks',
                                content: <ListTasks
                                  tasks={tasks}
                                  selectedType={selectedType}
                                />
                              }
                            }]}
                          />
                        </Item.Content>
                      </Grid.Column>
                    </Grid.Row>
                  </Conditional>
                </Grid>
              </Item> :
              <Item>
                <Item.Content>{t('no_course_selected')}</Item.Content>
              </Item>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

const mapStateToProps = state => ({
  user: state.user,
  courses: state.courses,
  selfAssesments: state.selfAssesment.userSelfAssesments,
  activeCourse: state.instance
})

UserPage.propTypes = {
  user: shape({
    name: string
  }).isRequired,
  courses: arrayOf(shape({
    id: number.isRequired,
    name: string.isRequired
  })),
  activeCourse: shape(),
  dispatchGetCourseInstanceData: func.isRequired,
  match: shape({
    params: shape({
      courseId: string
    }).isRequired
  }).isRequired,
  dispatchGetUserCourses: func.isRequired,
  dispatchGetUserSelfAssesments: func.isRequired,
  dispatchToggleActivity: func.isRequired,
  dispatchToggleAssessment: func.isRequired,
  dispatchSetAssessmentStatus: func.isRequired,
  dispatchResetCourseInstance: func.isRequired,
  translate: func.isRequired
}

UserPage.defaultProps = {
  courses: [],
  activeCourse: { tasks: [], self_assessments: [], people: [] }
}

export default withLocalize(connect(mapStateToProps, {
  dispatchGetUserCourses: getUserCoursesAction,
  dispatchGetUserSelfAssesments: getUserSelfAssesments,
  dispatchGetCourseInstanceData: getCourseInstanceDataAction,
  dispatchToggleActivity: toggleCourseActivityAction,
  dispatchToggleAssessment: toggleAssessmentAction,
  dispatchSetAssessmentStatus: setAssessmentStatusAction,
  dispatchResetCourseInstance: resetCourseInstanceAction
})(UserPage))
