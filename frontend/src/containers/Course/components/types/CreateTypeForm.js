import React, { useState, Fragment } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button, Form, Label, Input } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { addType } from '../../actions/types'

import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import InfoBox from '../../../../utils/components/InfoBox'

export const CreateTypeForm = (props) => {
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')

  const addTypeSubmit = async (e) => {
    const response = await addType({
      type_header_id: props.headerId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
      multiplier: Number(e.target.multiplier.value),
      order: props.newOrder,
    })
    dispatch(response)
  }

  const contentPrompt = t('course.types.createTypeForm.prompt_1')
  const label = {
    name: t('common.name'),
    multiplier: t('course.types.common.multiplier'),
  }
  return (
    <div className="CreateTypeForm">
      <ModalForm
        header={
          <>
            {t('header')}
            <InfoBox buttonProps={{ floated: 'right' }} />
          </>
        }
        trigger={
          <Button basic onClick={() => setExpanded(!expanded)} className="addTypeButton" icon={{ name: 'add' }} />
        }
        actions={saveActions(t)}
        onSubmit={addTypeSubmit}
      >
        <p>{contentPrompt}.</p>
        <MultilingualField field="name" fieldDisplay={label.name} />
        <Form.Field inline>
          <Label size="large">{label.multiplier}</Label>
          <Input name="multiplier" type="number" min={0} max={1} step={0.01} />
        </Form.Field>
      </ModalForm>
    </div>
  )
}

/*
CreateTypeForm.propTypes = {
  addType: PropTypes.func.isRequired,
  headerId: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  newOrder: PropTypes.number.isRequired
}
*/

export default connect()(CreateTypeForm)
