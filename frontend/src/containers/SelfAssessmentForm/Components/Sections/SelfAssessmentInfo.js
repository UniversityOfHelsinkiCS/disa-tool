import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Form, Button, Card, TextArea } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

import { useTranslation } from 'react-i18next'
import Header from '../Header'
import { changeTextField } from '../../actions/selfAssesment'
import InfoBox from '../../../../utils/components/InfoBox'

const SelfAssessmentInfo = (props) => {
  const [values, setValues] = useState({})
  const [editInstructions, setEditInstructions] = useState(false)
  const { formData, edit } = props
  const { structure } = formData
  const { formInfo } = structure
  const dispatch = useDispatch()
  const { t } = useTranslation('translation', { keyPrefix: 'selfAssessmentForm.sections' })

  const handleChange = (e, { id }) => {
    const oldValue = values
    oldValue[id] = e.target.value
    setValues(oldValue)
  }

  const toggleInstructions = () => {
    changeTextField({ values, type: 'instructions' }, dispatch)
    setEditInstructions(!editInstructions)
    setValues({})
  }

  const toggleHeader = async (values) => {
    changeTextField({ type: 'name', values }, dispatch)
  }

  const instructions = formInfo.filter((d) => d.type.includes('instruction'))
  const names = formInfo.filter((d) => d.type.includes('name'))
  return (
    <Form style={{ padding: '20px' }}>
      <Form.Field>
        <Header name={formData.name} edit={edit} editButton headers={names} dispatchChange={toggleHeader} nestedForms />
      </Form.Field>
      <Form.Field>
        <Card centered fluid>
          <Card.Content>
            {edit && <InfoBox translationid="SelfAssessmentInstructionsEdit" buttonProps={{ floated: 'right' }} />}
            <Card.Header style={{ textAlign: 'center' }}>
              {formData.instructions.header}
              {edit && (
                <Button style={{ marginLeft: '10px' }} onClick={toggleInstructions}>
                  {!editInstructions ? t('buttonEdit') : t('buttonSave')}
                </Button>
              )}
            </Card.Header>
            {!editInstructions ? (
              <Card.Description>
                <ReactMarkdown>{formData.instructions.value}</ReactMarkdown>
              </Card.Description>
            ) : (
              instructions.map((d) => (
                <Form.Field key={d.id}>
                  <label>{d.prefix}</label>
                  <TextArea
                    autoheight="true"
                    id={d.id}
                    value={values[d.id] ? values[d.id] : d.value}
                    onChange={handleChange}
                  />
                </Form.Field>
              ))
            )}
          </Card.Content>
        </Card>
      </Form.Field>
    </Form>
  )
}
/*
SelfAssessmentInfo.propTypes = {
  dispatchTextFieldChange: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    structure: PropTypes.shape({
      formInfo: PropTypes.arrayOf(PropTypes.shape())
    })
  }),
  edit: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
}
*/

export default connect()(SelfAssessmentInfo)
