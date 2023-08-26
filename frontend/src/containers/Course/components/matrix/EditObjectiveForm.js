import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { details } from '../../../../api/objectives'
import { editObjective } from '../../actions/objectives'

import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import { useTranslation } from 'react-i18next'

const EditObjectiveForm = (props) => {
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState({
    name: {
      eng: '',
      fin: '',
      swe: ''
    }
  })
  const dispatch = useDispatch()
  const {t} = useTranslation('translation', {keyPrefix: 'course.matrix.editObjectiveForm'})

  const editObjectiveSubmitAsync = async (e) => {
    const response = await editObjective({
      id: props.objectiveId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value
    })
    dispatch(response)
  }

  const loadDetails = async () => {
    const objectiveDetails = (await details({
      id: props.objectiveId
    })).data.data
    setLoading(false)
    setValues({
        name: {
          eng: objectiveDetails.eng_name,
          fin: objectiveDetails.fin_name,
          swe: objectiveDetails.swe_name
        }
    })
  }

    return (
      <div className="EditObjectiveForm">
        <ModalForm
          header={t('header')}
          trigger={<Button basic circular onClick={loadDetails} icon={{ name: 'edit' }} size="mini" />}
          actions={saveActions(t)}
          onSubmit={editObjectiveSubmitAsync}
          loading={loading}
        >
          <MultilingualField field="name" fieldDisplay={t('name')} values={values.name} />
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
