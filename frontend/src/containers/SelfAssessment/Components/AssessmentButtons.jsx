import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

const AssessmentButtons = (props) => {
  const { onClick, value } = props
  const {t} = useTranslation("translation", {keyPrefix: "selfAssessment.assessmentButtons"})
  return (
    <div>
      <Form.Field>
        <Button
          size="tiny"
          toggle
          type="button"
          assessment="category"
          id={value}
          onClick={onClick}
        >
          {t('categoryButton')}
        </Button>
        <Button
          size="tiny"
          toggle
          type="button"
          assessment="objective"
          id={value}
          onClick={onClick}
        >
          {t('objectiveButton')}
        </Button>
      </Form.Field>
    </div>
  )
}

/*
AssessmentButtons.propTypes = {
  translate: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.number
}
*/

export default AssessmentButtons
