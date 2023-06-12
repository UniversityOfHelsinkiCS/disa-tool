import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const AssessmentButtons = (props) => {
    const { t } = useTranslation()
    const { onClick, value } = props
    const translate = (id) => t(`SelfAssessment.AssessmentButtons.${id}`)
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
                    {translate('categoryButton')}
                </Button>
                <Button
                    size="tiny"
                    toggle
                    type="button"
                    assessment="objective"
                    id={value}
                    onClick={onClick}
                >
                    {translate('objectiveButton')}
                </Button>
            </Form.Field>
        </div>
    )
}

AssessmentButtons.defaultProps = {
    value: -1,
}
AssessmentButtons.propTypes = {
    translate: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.number,
}

export default AssessmentButtons
