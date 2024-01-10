import React from 'react'
import { Button, Popup } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { connect, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const InfoBox = ({ translationid, buttonProps = {}, popupProps = {}, useCourseRole = false }) => {
  const user = useSelector((state) => state.user)
  const courseInstance = useSelector((state) => state.instance)
  const { t } = useTranslation('translation', { keyPrefix: `infobox` })
  // modals cannot use translate, so they must pass translate as translateFunc prop to InfoBox

  const isTeacher = useCourseRole ? courseInstance.courseRole === 'TEACHER' : user.role === 'TEACHER'
  const isAdmin = user.role === 'ADMIN'
  const isStudent = !isTeacher && !isAdmin

  const explainStudent = t('common.student')
  const textStudent = t(`${translationid}.student`)
  const explainTeacher = t('common.teacher')
  const textTeacher = t(`${translationid}.teacher`)

  let text = isStudent ? textStudent : textTeacher
  text = `<span style="color: gray;">${explainStudent}</span><br />${textStudent}<br /><br /><span style="color: gray;">${explainTeacher}</span><br />${textTeacher}`

  return (
    <Popup
      wide="very"
      position="left center"
      trigger={<Button circular icon="info" {...buttonProps} />}
      content={<ReactMarkdown rehypePlugins={[rehypeRaw]}>{text}</ReactMarkdown>}
      {...popupProps}
    />
  )
}
/*
InfoBox.propTypes = {
  translate: PropTypes.func.isRequired,
  translationid: PropTypes.string.isRequired,
  buttonProps: PropTypes.shape({}),
  popupProps: PropTypes.shape({}),
  courseInstance: PropTypes.shape({
  }),
  user: PropTypes.shape({
    role: PropTypes.string
  }).isRequired,
  translateFunc: PropTypes.func,
  useCourseRole: PropTypes.bool
}
*/

export default connect()(InfoBox)
