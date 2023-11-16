import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button, Form, Label, Input } from 'semantic-ui-react'
import { editType } from '../../actions/types'
import { details } from '../../../../api/types'

import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import { useTranslation } from 'react-i18next'

export const EditTypeForm = (props) => {
  const [loading, setLoading] = useState(true)
  const [multiplier, setMultiplier] = useState(0)
  const [values, setValues] = useState({
    name: {
      eng: '',
      fin: '',
      swe: ''
    },
  })
  const dispatch = useDispatch()
  const {t} = useTranslation('translation')

  const editTypeSubmit = async(e) => {
    const response = await editType({
      id: props.typeId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
      multiplier: Number(e.target.multiplier.value)
    })
    dispatch(response)
    setLoading(true)
  }

 const  loadDetails = async () => {
    const typeDetails = (await details({
      id: props.typeId
    })).data.data
    setLoading(false)
    setMultiplier(typeDetails.multiplier)
    setValues({
      name: {
        eng: typeDetails.eng_name,
        fin: typeDetails.fin_name,
        swe: typeDetails.swe_name
      }
    })
  }

    const contentPrompt = t('course.types.editTypeForm.prompt_1')
    const label = {
      name: t('common.name'),
      multiplier: t('course.types.editTypeForm.multiplier')
    }
    console.log(label.name)
    return (
      <div className="EditTypeForm">
        <ModalForm
          header={t('header')}
          trigger={<Button basic circular onClick={loadDetails} className="editTypeButton" icon={{ name: 'edit' }} size="mini" />}
          onSubmit={editTypeSubmit}
          actions={saveActions(t)}
          loading={loading}
        >
          <p>{contentPrompt}.</p>
          <MultilingualField field="name" fieldDisplay={label.name} values={values.name} />
          <Form.Field inline>
            <Label size="large">{label.multiplier}</Label>
            <Input
              name="multiplier"
              type="number"
              min={0}
              max={1}
              step={0.01}
              value={values.multiplier}
              onChange={e => setMultiplier(e.target.value)}
            />
          </Form.Field>
        </ModalForm>
      </div>
    )
}
/*
EditTypeForm.propTypes = {
  editType: PropTypes.func.isRequired,
  details: PropTypes.func.isRequired,
  typeId: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired
}
*/

export default connect()(EditTypeForm)
