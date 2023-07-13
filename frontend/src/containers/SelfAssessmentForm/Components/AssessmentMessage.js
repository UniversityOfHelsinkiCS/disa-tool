import React from 'react'
import { Message } from 'semantic-ui-react'

const AssessmentMessage = (props) => {
  const { preview, open, edit, existingAnswer, t } = props
  if(preview && !edit){
    return <Message style={{ textAlign: 'center' }} color="green">{t('reviewMessage')}</Message>
  }
  if (preview) {
    return <Message style={{ textAlign: 'center' }} color="green">{t('previewMessage')}</Message>
  }
  if (!open && !edit) {
    return <Message style={{ textAlign: 'center' }} color="grey">{t('notOpenMessage')}</Message>
  }

  if (open && existingAnswer) {
    return <Message style={{ textAlign: 'center' }} color="green">{t('existingResponse')}</Message>
  }
  return null
}

AssessmentMessage.defaultProps = {
  existingAnswer: false
}
/*
AssessmentMessage.propTypes = {
  preview: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  existingAnswer: PropTypes.bool,
  translate: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired
}
*/
export default AssessmentMessage
