import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { details } from '../../../../api/skillLevels'
import { editLevel } from '../../actions/levels'

import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import { useTranslation } from 'react-i18next'

const EditLevelForm = (props) =>  {
  const [values, setValues] = useState({
    name: {
      eng: '',
      fin: '',
      swe: ''
    }
  })
const [loading, setLoading] = useState(true)
const dispatch = useDispatch()

  const editLevelSubmit = async (e) => {
    
    const response = await editLevel({
    id: props.levelId,
    eng_name: e.target.eng_name.value,
    fin_name: e.target.fin_name.value,
    swe_name: e.target.swe_name.value
  })
  dispatch(response)

}
  const loadDetails = async () => {
    const levelDetails = (await details({
      id: props.levelId
    })).data.data
    setValues({
      name: {
        eng: levelDetails.eng_name,
        fin: levelDetails.fin_name,
        swe: levelDetails.swe_name
      }
    })
    setLoading(false)
  }

  const {t} = useTranslation("translation")

    return (
      <div className="EditLevelForm">
        <ModalForm
          header={t('course.matrix.editLevelForm.header')}
          trigger={<Button basic circular onClick={loadDetails} icon={{ name: 'edit' }} size="mini" />}
          onSubmit={editLevelSubmit}
          loading={loading}
          actions={saveActions()}
        >
          <MultilingualField field="name" fieldDisplay={t('name')} values={values.name} />
        </ModalForm>
      </div>
    )
  }
/*
EditLevelForm.propTypes = {
  editLevel: PropTypes.func.isRequired,
  levelId: PropTypes.number.isRequired,
  details: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
}
*/

export default connect()(EditLevelForm)
