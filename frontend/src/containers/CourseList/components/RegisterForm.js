import React from 'react'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { registerToCourse, unregisterFromCourse } from '../actions/coursePersons'
import { useTranslation } from 'react-i18next'

const RegisterForm = (props) => {
  const user = useSelector((state) => state.user)

  const { t } = useTranslation('translation', { keyPrefix: 'courseList.registerForm' })

  const registerAction = async () => {
    let response
    if (props.registered) {
      response = await unregisterFromCourse({ course_instance_id: props.instanceId })
    } else {
      response = await registerToCourse({ course_instance_id: props.instanceId })
    }

    response && dispatch(response)
  }

  if (user.id) {
    return (
      <Button fluid className="RegisterForm" onClick={() => registerAction()} inverted color="blue">
        {props.registered ? t('unregister') : t('register')}
      </Button>
    )
  }
  return (
    <Button
      fluid
      as={Link}
      to={`/courses/register?course=${props.courseId}&instance=${props.instanceId}`}
      className="RegisterForm"
      inverted
      color="blue"
    >
      {`${t('register')} (${t('require_login')})`}
    </Button>
  )
}
/*
RegisterForm.propTypes = {
  registered: PropTypes.string,
  courseId: PropTypes.number.isRequired,
  instanceId: PropTypes.number.isRequired,
  registerAction: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number
  }).isRequired
}
*/

export default connect()(RegisterForm)
