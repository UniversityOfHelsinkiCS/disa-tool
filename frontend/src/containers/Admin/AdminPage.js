import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Container, Form, Button, Icon, Loader, Grid, Accordion, Pagination } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import { adminGetUsers, adminChangeGlobalRole } from './actions/persons'
import { adminChangeCourseRole, removeCoursePerson } from './actions/coursePersons'
import RoleList from './components/RoleList'

const AdminPage = () => {
  const users = useSelector((state) => state.admin.users)
  const dispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState(-1)
  const [activePage, setActivePage] = useState(1)
  const [getAll, setGetAll] = useState(false)
  const [loading, setLoading] = useState(false)
  const [crash, setCrash] = useState(false)

  const adminGetUsersAsync = async ({ studentInfo, getAll }) => {
    const response = await adminGetUsers({
      studentInfo,
      getAll,
    })
    dispatch(response)
  }

  const adminChangeCourseRoleAsync = async ({ personId, courseInstanceId, role }) => {
    const response = await adminChangeCourseRole({
      personId,
      courseInstanceId,
      role,
    })
    dispatch(response)
  }

  const adminChangeGlobalRoleAsync = async ({ personId, role }) => {
    const response = await adminChangeGlobalRole({ personId, role })
    dispatch(response)
  }

  const removeCoursePersonAsync = async (props) => {
    const response = await removeCoursePerson({
      id: props.personId,
      course_instance_id: props.courseInstanceId,
    })
    dispatch(response)
  }

  const chaosMonkey = () => {
    setCrash(true)
  }

  const handleSubmit = async (event) => {
    const studentInfo = event.target.userInfo.value
    if (!getAll && studentInfo === '') {
      dispatch({
        type: 'TOAST',
        payload: {
          type: 'error',
          toast: 'Syötä hakuparametri tai valitse kaikki',
        },
      })
      return true
    }
    setLoading(true)
    await adminGetUsersAsync({
      studentInfo: getAll ? undefined : studentInfo,
      getAll,
    })
    setLoading(false)
    setActivePage(1)
    return true
  }

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  const handlePaginationChange = (e, { activePage }) => setActivePage(activePage)

  const changeRole = async (personId, courseInstanceId, role) => {
    if (courseInstanceId) {
      await adminChangeCourseRoleAsync({
        personId,
        courseInstanceId,
        role,
      })
    } else {
      await adminChangeGlobalRoleAsync({ personId, role })
    }
  }

  const deleteRole = (personId, courseInstanceId) => () =>
    removeCoursePersonAsync({
      personId,
      courseInstanceId,
    })

  const { t } = useTranslation('translation', { keyPrefix: 'admin.adminPage.' })

  if (crash) throw new Error('Ooh aah, error')
  return (
    <Container style={{ paddingTop: '100px' }}>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Form onSubmit={handleSubmit}>
              <h2>{t('header')}</h2>

              <Form.Field width={8}>
                <input name="userInfo" disabled={getAll} placeholder={`(${t('search_placeholder')})`} />
              </Form.Field>
              <Form.Checkbox name="getAll" onChange={() => setGetAll(!getAll)} label={t('get_all')} />
              <Button>
                <Icon name="search" />
                {t('search_button')}
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={10}>
            {loading && <Loader active />}

            {users.length > 0 && (
              <Accordion fluid styled>
                {users.slice((activePage - 1) * 20, activePage * 20).map((u) => (
                  <div key={u.id}>
                    <Accordion.Title active={activeIndex === u.id} index={u.id} onClick={handleClick}>
                      <Icon name="dropdown" />
                      {u.name}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === u.id}>
                      <RoleList t={t} user={u} deleteRole={deleteRole} changeRole={changeRole} />
                    </Accordion.Content>
                  </div>
                ))}
              </Accordion>
            )}
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={5} />
          <Grid.Column width={8}>
            {users.length > 20 ? (
              <Pagination
                activePage={activePage}
                onPageChange={handlePaginationChange}
                totalPages={Math.ceil(users.length / 20)}
              />
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Button content="Do not press!" color="red" onClick={chaosMonkey} />
    </Container>
  )
}
/*
AdminPage.propTypes = {
  dispatchToast: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  adminGetUsers: PropTypes.func.isRequired,
  adminChangeCourseRole: PropTypes.func.isRequired,
  adminChangeGlobalRole: PropTypes.func.isRequired,
  removeCoursePerson: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}
*/

export default connect()(AdminPage)
