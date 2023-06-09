import React from 'react'
import { List } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import DeleteForm from '../../../utils/components/DeleteForm'
import AddToCourseForm from './AddToCourseForm'
import RoleButtons from './RoleButtons'

const RoleList = (props) => {
  const { user, deleteRole, changeRole } = props

  const {t} = useTranslation('Admin.AdminPage')


  return (
    <List divided>
      <List.Item>
        <List.Header>{t('course_roles')}</List.Header>
      </List.Item>
      {user.course_people.map(ucp => (
        <List.Item key={ucp.id}>
          <List.Content floated="right">
            <div>
              <DeleteForm
                onExecute={deleteRole(user.id, ucp.course_instance_id)}
                header={t('delete_header')}
                prompt={[
                  t('delete_prompt_1'),
                  user.name,
                  t('delete_prompt_2'),
                  ucp.course_instance.name
                ]}
              />
            </div>
          </List.Content>
          <List.Content floated="right">
            <div>
              <RoleButtons
                action={changeRole}
                courseInstanceId={ucp.course_instance_id}
                role={ucp.role}
                id={user.id}
                roles={['STUDENT', 'TEACHER']}
                buttonTexts={[t('student_button'), t('teacher_button')]}
              />
            </div>
          </List.Content>
          <List.Content>
            {ucp.course_instance.name}
          </List.Content>
        </List.Item>
      ))}
      <List.Item>
        <div style={{ margin: '10px 0px 10px 0px' }}>
          <AddToCourseForm person={user} />
        </div>
      </List.Item>
      <List.Item>
        <List.Content floated="right">
          <RoleButtons
            action={changeRole}
            role={user.role}
            id={user.id}
            roles={['STUDENT', 'TEACHER']}
            buttonTexts={[t('student_button'), t('teacher_button')]}
          />
        </List.Content>
        <List.Content>
          {t('global_role_label')}
        </List.Content>
      </List.Item>
    </List>
  )
}

RoleList.propTypes = {
  user: PropTypes.shape().isRequired,
  deleteRole: PropTypes.func.isRequired,
  changeRole: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}

export default RoleList
