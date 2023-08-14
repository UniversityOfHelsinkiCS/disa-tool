import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, List, Icon } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import LinkExportList from './components/LinkExportList'
import Conditional from '../../utils/components/Conditional'
import InfoBox from '../../utils/components/InfoBox'

export const CourseInfo = (props) => {
  const { course } = props
  const {t} = useTranslation('translation')

  return (
    <Fragment>
      <Grid.Row>
        <Grid.Column>
          <Header name="course-info-header" as="h1" floated="left">
            {course.name}
          </Header>
          <Conditional visible={props.isTeacher}>{
            <Button floated="right" color={course.active ? 'green' : 'red'} onClick={props.toggleActivation}>{t(course.active ? 'userPage.courseInfo.close_course' : 'userPage.courseInfo.start_course')}</Button>}
          </Conditional>
          <InfoBox translationid="UserPage" buttonProps={{ floated: 'right' }} useCourseRole />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as="h2" color={course.active ? 'green' : 'red'}>
            <Header.Subheader style={{ display: 'inline' }}>{t('userPage.courseInfo.this_course_is')}</Header.Subheader>
            {course.active ? <span><b>{t('common.open')}</b></span> : <span><b>{t('common.closed')}</b></span>}
          </Header>
          <Button.Group vertical>
            <Button
              as={Link}
              to={`/courses/matrix/${course.id}`}
              basic
              color="blue"
              icon
              labelPosition="right"
              style={{ marginBottom: '5px' }}
            >
              {t('common.course_matrix')}
              <Icon name="right arrow" />
            </Button>
            <Conditional visible={props.isTeacher}>
              <Button
                as={Link}
                to={`/course/${course.id}`}
                basic
                color="blue"
                icon
                labelPosition="right"
                style={{ marginBottom: '5px' }}
              >
                {t('userPage.courseInfo.edit_course')}
                <Icon name="right arrow" />
              </Button>
              <Button
                as={Link}
                to={{ pathname: `${course.id}/tasksAndPeople`, state: { courseId: course.id } }}
                basic
                color="blue"
                icon
                labelPosition="right"
                style={{ marginBottom: '5px' }}
              >
                {t('userPage.courseInfo.manage_course_people_tasks')}
                <Icon name="right arrow" />
              </Button>
            </Conditional>
          </Button.Group>
          <Conditional visible={props.isTeacher}>
            <LinkExportList course={course} />
          </Conditional>
        </Grid.Column>
        <Conditional visible={!!props.teachers}>
          <Grid.Column>
            <Header as="h3">{t('userPage.courseInfo.course_teachers')}</Header>
            <List name="course-info-teacher-list">
              {props.teachers.map(teacher => (
                <List.Item key={teacher.id}>
                  {teacher.name}
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Conditional>
      </Grid.Row>
    </Fragment>
  )
}
/*
CourseInfo.propTypes = {
  course: shape({
    id: number.isRequired,
    name: string.isRequired,
    active: bool.isRequired,
    courseRole: string.isRequired
  }).isRequired,
  teachers: arrayOf(shape({
    id: number.isRequired,
    name: string.isRequired
  })),
  isTeacher: bool.isRequired,
  toggleActivation: func.isRequired,
  translate: func.isRequired
}
*/
export default CourseInfo
