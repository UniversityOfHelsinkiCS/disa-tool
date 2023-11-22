import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { details } from '../../../../api/objectives'
import { editObjective } from '../../actions/objectives'

import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'

const EditObjectiveForm = ({ objectiveId }) => {
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState({
    eng: '',
    fin: '',
    swe: '',
  })
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')

  const editObjectiveSubmitAsync = async (e) => {
    const response = await editObjective({
      id: objectiveId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
    })
    dispatch(response)
  }

  const loadDetails = async () => {
    const objectiveDetails = (
      await details({
        id: objectiveId,
      })
    ).data.data
    setLoading(false)
    setValues({
      eng: objectiveDetails.eng_name,
      fin: objectiveDetails.fin_name,
      swe: objectiveDetails.swe_name,
    })
  }

  const labels = {
    header: t('course.matrix.editObjectiveForm.header'),
  }

  return (
    <div className="EditObjectiveForm">
      <ModalForm
        header={labels.header}
        trigger={
          <Button
            data-testid={`open-edit-objective-modal-${objectiveId}`}
            basic
            circular
            onClick={loadDetails}
            icon={{ name: 'edit' }}
            size="mini"
          />
        }
        actions={saveActions(t)}
        onSubmit={editObjectiveSubmitAsync}
        loading={loading}
      >
        <MultilingualField
          type="objective-form"
          id={objectiveId}
          field="name"
          fieldDisplay={t('common.name')}
          values={values}
        />
      </ModalForm>
    </div>
  )
}
/*
EditObjectiveForm.propTypes = {
  editObjective: PropTypes.func.isRequired,
  objectiveId: PropTypes.number.isRequired,
  details: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}
*/
export default connect()(EditObjectiveForm)
