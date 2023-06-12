import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Form, Button, Card, TextArea } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

import Header from '../Header'
import { changeTextField } from '../../actions/selfAssesment'
import InfoBox from '../../../../utils/components/InfoBox'

const SelfAssessmentInfo = (props) => {
    const [editInstructions, setEditInstructions] = useState(false)
    const [values, setValues] = useState({})

    const handleChange = (e, { id }) => {
        const oldValue = values
        oldValue[id] = e.target.value
        setValues(oldValue)
    }
    const toggleInstructions = () => {
        props.dispatchTextFieldChange({ values, type: 'instructions' })
        setEditInstructions(!editInstructions)
        setValues({})
    }

    const toggleHeader = (values) => {
        props.dispatchTextFieldChange({ values, type: 'name' })
    }

    const { t } = useTranslation(`SelfAssessmentForm.Sections`)

    const { formData } = props
    const { structure } = props.formData
    const { formInfo } = structure
    const instructions = formInfo.filter((d) => d.type.includes('instruction'))
    const names = formInfo.filter((d) => d.type.includes('name'))
    const { edit } = props

    return (
        <Form style={{ padding: '20px' }}>
            <Form.Field>
                <Header
                    name={formData.name}
                    edit={edit}
                    editButton
                    headers={names}
                    dispatchChange={toggleHeader}
                />
            </Form.Field>
            <Form.Field>
                <Card centered fluid>
                    <Card.Content>
                        {edit && (
                            <InfoBox
                                translationid="SelfAssessmentInstructionsEdit"
                                buttonProps={{ floated: 'right' }}
                            />
                        )}
                        <Card.Header style={{ textAlign: 'center' }}>
                            {formData.instructions.header}
                            {edit && (
                                <Button
                                    style={{ marginLeft: '10px' }}
                                    onClick={toggleInstructions}
                                >
                                    {!editInstructions
                                        ? t('buttonEdit')
                                        : t('buttonSave')}
                                </Button>
                            )}
                        </Card.Header>
                        {!editInstructions ? (
                            <Card.Description>
                                <ReactMarkdown>
                                    {formData.instructions.value}
                                </ReactMarkdown>
                            </Card.Description>
                        ) : (
                            instructions.map((d) => (
                                <Form.Field key={d.id}>
                                    <label>{d.prefix}</label>
                                    <TextArea
                                        autoHeight
                                        id={d.id}
                                        onChange={handleChange}
                                    >
                                        {values[d.id] ? values[d.id] : d.value}
                                    </TextArea>
                                </Form.Field>
                            ))
                        )}
                    </Card.Content>
                </Card>
            </Form.Field>
        </Form>
    )
}

SelfAssessmentInfo.propTypes = {
    dispatchTextFieldChange: PropTypes.func.isRequired,
    formData: PropTypes.shape({
        structure: PropTypes.shape({
            formInfo: PropTypes.arrayOf(PropTypes.shape()),
        }),
        instructions: PropTypes.shape(),
        name: PropTypes.string,
    }),
    edit: PropTypes.bool.isRequired,
    translate: PropTypes.func.isRequired,
}

SelfAssessmentInfo.defaultProps = {
    formData: {
        structure: {
            formInfo: [],
        },
    },
}

const mapDispatchToProps = (dispatch) => ({
    dispatchTextFieldChange: (type, value) =>
        dispatch(changeTextField(type, value)),
})

export default connect(null, mapDispatchToProps)(SelfAssessmentInfo)
