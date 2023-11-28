import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Accordion, Dimmer, Header, Grid, Item, Loader, Button } from 'semantic-ui-react'

import { useTranslation } from 'react-i18next'
import {
  getUserCoursesAction,
  getUserSelfAssesments,
  getCourseInstanceDataAction,
  toggleCourseActivityAction,
  toggleAssessmentAction,
  setAssessmentStatusAction,
  resetCourseInstanceAction,
} from '../../actions/actions'
import CourseSideMenu from './CourseSideMenu'
import { ListTasks } from './ListTasks'
import CourseSelfAssessmentsList from './CourseSelfAssessmentsList'
import CourseInfo from './CourseInfo'
import Conditional from '../../utils/components/Conditional'
import InfoBox from '../../utils/components/InfoBox'

const UserPage = (props) => {
  const user = useSelector((state) => state.user)
  const courses = useSelector((state) => state.courses)
  const activeCourse = useSelector((state) => state.instance)
  const [loading, setLoading] = useState(false)
  const [selectedType, setSelectedType] = useState(undefined)
  const { courseId } = useParams()
  const dispatch = useDispatch()

  const { t, i18n } = useTranslation('translation', { keyPrefix: 'userPage.common' })

  useEffect(() => {
    const onMount = async () => {
      setLoading(true)
      await getUserCoursesAction(dispatch)
      await getUserSelfAssesments(user, dispatch)
      if (courseId) {
        await getCourseInstanceDataAction(courseId, dispatch)
      }
      setLoading(false)
    }
    onMount()
    return () => {
      if (courseId && activeCourse.id) {
        dispatch(resetCourseInstanceAction)
      }
    }
  }, [courseId, i18n.language])

  const handleActivityToggle = async () => {
    await toggleCourseActivityAction(activeCourse.id, dispatch)
      // eslint-disable-next-line no-console
      .then((res) => console.log(res))
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err))
  }

  const handleClick = async (e, { course }) => {
    // setState({ activeCourse: course })
    // Fetch all relevant course information: tasks with responses & assessments with responses.
    if (!loading && courseId) {
      await getCourseInstanceDataAction(course.id, dispatch)
    }
  }

  const toggleAssessment = (e, { value }) => {
    switch (e.target.name) {
      case 'assessmentHidden':
        setAssessmentStatusAction(
          value,
          [
            { name: 'open', value: false },
            { name: 'active', value: false },
          ],
          dispatch,
        )
        break
      case 'assessmentShown':
        setAssessmentStatusAction(
          value,
          [
            { name: 'open', value: false },
            { name: 'active', value: true },
          ],
          dispatch,
        )
        break
      case 'assessmentOpen':
        setAssessmentStatusAction(
          value,
          [
            { name: 'open', value: true },
            { name: 'active', value: true },
          ],
          dispatch,
        )
        break
      case 'feedbackOpen':
        toggleAssessmentAction(value, 'show_feedback', dispatch)
        break
      default:
        // eslint-disable-next-line no-console
        console.log('Something went wrong here now')
    }
  }

  const { self_assessments: assessments, tasks } = activeCourse
  if (!activeCourse.people) return <div />
  const isTeacher = activeCourse.courseRole === 'TEACHER'
  const isGlobalTeacher = user.role === 'TEACHER' || user.role === 'ADMIN'
  /*  const students =
    activeCourse.id && isTeacher
      ? activeCourse.people.filter((person) => person.course_instances[0].course_person.role !== 'TEACHER')
      : [] */
  const teachers = activeCourse.id
    ? activeCourse.people.filter((person) => person.course_instances[0].course_person.role === 'TEACHER')
    : []
  return (
    <Grid padded="horizontally">
      <Dimmer active={loading} inverted>
        <Loader inverted />
      </Dimmer>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">
            {t('hello')} {props.user && props.user.name}
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3}>
          <CourseSideMenu courses={courses} activeCourse={activeCourse} handleChange={handleClick} />
        </Grid.Column>
        <Grid.Column width={13} data-testid="course-info">
          {activeCourse.id ? (
            <Item>
              <Grid padded="horizontally" columns="equal">
                <CourseInfo
                  course={activeCourse}
                  toggleActivation={handleActivityToggle}
                  teachers={teachers}
                  isTeacher={isTeacher}
                  isGlobalTeacher={isGlobalTeacher}
                />
                <Conditional visible={isTeacher || assessments.some((a) => a.active)}>
                  <Grid.Row>
                    <Grid.Column>
                      <Item.Content>
                        <InfoBox
                          translationid="userPageSelfAssessments"
                          buttonProps={{ floated: 'right' }}
                          useCourseRole
                        />
                        <Header as="h2">{t('self_assessments')}</Header>
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
                        <InfoBox translationid="userPageTasks" buttonProps={{ floated: 'right' }} useCourseRole />
                        <Header as="h2">{t('tasks')}</Header>
                        <Accordion
                          defaultActiveIndex={-1}
                          styled
                          fluid
                          panels={[
                            {
                              key: 'ListTasks',
                              title: t('open_task_list'),
                              content: {
                                key: 'tasks',
                                content: <ListTasks tasks={tasks} selectedType={selectedType} />,
                              },
                            },
                          ]}
                        />
                      </Item.Content>
                    </Grid.Column>
                  </Grid.Row>
                </Conditional>
              </Grid>
            </Item>
          ) : (
            <Item>
              <Item.Content>{t('no_course_selected')}</Item.Content>
            </Item>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

/*
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
*/

export default connect()(UserPage)
