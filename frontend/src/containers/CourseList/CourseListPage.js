import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useLocation } from 'react-router-dom'
import { orderBy } from 'lodash'
import { Button, Header, List, Grid, Dropdown, Icon, Message, Form } from 'semantic-ui-react'
import { getAllCourses, selectCourse } from './actions/courses'
import { getInstancesOfCourse, selectInstance, getTemplateInstances } from './actions/courseInstances'
import CreateInstanceForm from './components/CreateInstanceForm'
import RegisterForm from './components/RegisterForm'
import EditInstanceForm from './components/EditInstanceForm'
import EditCourseForm from './components/EditCourseForm'
import Conditional from '../../utils/components/Conditional'
import InfoBox from '../../utils/components/InfoBox'
import { useTranslation } from 'react-i18next'

const CourseListPage = (props) => {
  const { courses, selectedCourse, selectedInstance, instances } = useSelector((state) => state.listCourses)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { search } = useLocation()
  const searchQuery = new URLSearchParams(search)

  const { t, i18n } = useTranslation('translation')

  const getAllCoursesAsync = async () => {
    const response = await getAllCourses()
    dispatch(response)
  }

  const getTemplateInstancesAsync = async () => {
    const response = await getTemplateInstances()
    dispatch(response)
  }

  const getInstancesOfCourseAsync = async (value) => {
    const response = await getInstancesOfCourse(value)
    dispatch(response)
  }

  useEffect(() => {
    const asyncUseEffect = async () => {
      await getAllCoursesAsync()
      const templateCourse = courses.find((e) => ['KURSSIPOHJAT', 'COURSE TEMPLATES', 'KURSMALL'].includes(e.name))

      if (templateCourse != null) {
        await getTemplateInstancesAsync()
      }
      if (search && searchQuery.get('course')) {
        dispatch(selectCourse(Number(searchQuery.get('course'))))
        await getInstancesOfCourseAsync(Number(searchQuery.get('course')))
        if (searchQuery.get('instance')) {
          dispatch(selectInstance(Number(searchQuery.get('instance'))))
        }
      }
      if (selectedCourse) {
        await getInstancesOfCourseAsync(selectedCourse.id)
      }
    }
    asyncUseEffect()
  }, [i18n.language])

  const handleChange = (e, data) => {
    if (data.value && data.value !== selectedCourse) {
      dispatch(selectCourse(Number(data.value)))
      dispatch(selectInstance(undefined))
      getInstancesOfCourseAsync(Number(data.value))
    }
  }

  const handleSelectInstance = (e, data) => {
    dispatch(selectInstance(Number(data.value)))
  }

  const courseOptions = orderBy(
    courses.map((course) => ({ key: course.id, text: course.name, value: course.id })),
    'text',
  )
  return (
    <Grid padded="vertically">
      <Grid.Row>
        <Grid.Column width={4}>
          <List selection>
            {user && (user.role === 'TEACHER' || user.role === 'ADMIN') && selectedCourse ? (
              <List.Item style={{ color: 'green' }}>
                <CreateInstanceForm courseId={selectedCourse.id} />
              </List.Item>
            ) : null}
            {instances.map((instance) => (
              <List.Item
                key={`${i18n.language}-${instance.id}`}
                style={instance.active ? { color: 'blue' } : undefined}
                onClick={handleSelectInstance}
                value={instance.id.toString()}
              >
                {instance.name}
              </List.Item>
            ))}
          </List>
        </Grid.Column>
        <Grid.Column width={8}>
          <Form>
            <Form.Group inline>
              <Dropdown
                fluid
                search
                selection
                value={selectedCourse ? selectedCourse.id : undefined}
                options={courseOptions}
                onChange={handleChange}
                placeholder={t('courseList.courseListPage.course_select_placeholder')}
                selectOnBlur={false}
                selectOnNavigation={false}
              />
              <Conditional visible={user.role === 'TEACHER' || user.role === 'ADMIN'}>
                <Button
                  style={{ marginLeft: '10px' }}
                  as={Link}
                  to="/courses/create"
                  labelPosition="left"
                  color="green"
                  icon
                  basic
                >
                  {t('courseList.courseListPage.create_trigger')}
                  <Icon name="add" color="green" />
                </Button>
                <Conditional visible={user && (user.role === 'TEACHER' || user.role === 'ADMIN') && !!selectedCourse}>
                  <EditCourseForm courseId={selectedCourse ? selectedCourse.id : undefined} />
                </Conditional>
              </Conditional>
              <InfoBox translationid="CoursesPage" buttonProps={{ floated: 'right' }} />
            </Form.Group>
          </Form>
          {selectedCourse ? (
            <div>
              {selectedInstance ? (
                <div>
                  <div style={{ display: 'flex' }}>
                    <h2 style={{ flexGrow: 1 }}>{selectedInstance.name}</h2>
                    {selectedInstance.registered === 'TEACHER' ? (
                      <EditInstanceForm course_instance_id={selectedInstance.id} />
                    ) : null}
                  </div>
                  <Header as="h2" color={selectedInstance.active ? 'green' : 'red'}>
                    <Header.Subheader style={{ display: 'inline' }}>
                      {t('courseList.courseListPage.state')}{' '}
                    </Header.Subheader>
                    {selectedInstance.active ? (
                      <span>
                        <b>{t('common.open')}</b>
                      </span>
                    ) : (
                      <span>
                        <b>{t('common.closed')}</b>
                      </span>
                    )}
                  </Header>
                  <Conditional visible={!!selectedInstance.registered}>
                    <Message info>{t('courseList.courseListPage.you_are')}</Message>
                  </Conditional>
                  <List>
                    <List.Item>
                      <Conditional visible={!!selectedInstance.registered}>
                        <Button fluid as={Link} to={`/user/course/${selectedInstance.id}`}>
                          {t('courseList.courseListPage.coursepage_button')}
                        </Button>
                      </Conditional>
                    </List.Item>
                    <List.Item>
                      <Button
                        fluid
                        as={Link}
                        to={`/courses/matrix/${selectedInstance.id}`}
                        color="blue"
                        basic
                        content={t('common.course_matrix')}
                      />
                    </List.Item>
                    <Conditional visible={selectedInstance.active}>
                      <List.Item>
                        <RegisterForm
                          registered={selectedInstance.registered}
                          courseId={selectedCourse.id}
                          instanceId={selectedInstance.id}
                        />
                      </List.Item>
                    </Conditional>
                  </List>
                </div>
              ) : (
                <Message info>{t('courseList.courseListPage.instance_prompt')}</Message>
              )}
            </div>
          ) : (
            <Message info>{t('courseList.courseListPage.course_prompt')}</Message>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
/*
CourseListPage.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  instances: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
  })).isRequired,
  getAllCourses: PropTypes.func.isRequired,
  getInstancesOfCourse: PropTypes.func.isRequired,
  getTemplateInstances: PropTypes.func.isRequired,
  selectedCourse: PropTypes.shape({
    id: PropTypes.number.isRequired
  }),
  selectedInstance: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    registered: PropTypes.string
  }),
  selectCourse: PropTypes.func.isRequired,
  selectInstance: PropTypes.func.isRequired,
  location: PropTypes.shape({
    query_params: PropTypes.objectOf(PropTypes.string).isRequired
  }).isRequired,
  user: PropTypes.shape({
    role: PropTypes.string,
    id: PropTypes.number
  }).isRequired,
  t: PropTypes.func.isRequired
}
*/
CourseListPage.defaultProps = {
  selectedCourse: null,
  selectedInstance: null,
}

export default connect()(CourseListPage)
