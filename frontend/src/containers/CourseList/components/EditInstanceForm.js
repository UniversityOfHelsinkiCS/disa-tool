import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import { details } from '../../../api/courseInstances'
import { editInstance } from '../actions/courseInstances'

import ModalForm, { saveActions } from '../../../utils/components/NewModalForm'
import MultilingualField from '../../../utils/components/MultilingualField'

export const EditInstanceForm = (props) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    eng: '',
    fin: '',
    swe: '',
  })
  const [loading, setLoading] = useState(true)
  const [triggered, setTriggered] = useState(false)

  const { t } = useTranslation('translation', { keyPrefix: 'courseList.editInstanceForm' })

  const editInstanceSubmit = async (e) => {
    const response = await editInstance({
      id: props.course_instance_id,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
    })
    dispatch(response)
    setTriggered(false)
    setLoading(true)
  }

  const loadDetails = async () => {
    if (triggered) return false
    setTriggered(true)
    const instanceDetails = (
      await details({
        id: props.course_instance_id,
      })
    ).data.data
    setValues({
      eng: instanceDetails.eng_name,
      fin: instanceDetails.fin_name,
      swe: instanceDetails.swe_name,
    })
    setLoading(false)
    return true
  }

  return (
    <div className="EditInstanceForm">
      <ModalForm
        header={t('header')}
        trigger={<Button type="button" basic circular icon={{ name: 'edit' }} />}
        onSubmit={editInstanceSubmit}
        actions={saveActions()}
        loading={loading}
        onOpen={loadDetails}
      >
        <p>{t('prompt_1')}.</p>
        <MultilingualField field="name" fieldDisplay={t('name')} values={values} />
      </ModalForm>
    </div>
  )
}
/*
EditInstanceForm.propTypes = {
  course_instance_id: PropTypes.number.isRequired,
  editInstance: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}
*/

export default connect()(EditInstanceForm)
