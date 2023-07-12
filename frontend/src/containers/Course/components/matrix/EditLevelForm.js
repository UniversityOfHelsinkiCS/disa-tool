import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import { Button } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

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
    const levelDetails = (await props.details({
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

  const {t} = useTranslation("translation", {keyPrefix: "Course.matrix.EditLevelForm."})

    return (
      <div className="EditLevelForm">
        <ModalForm
          header={t('header')}
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
const mapDispatchToProps = dispatch => ({
  editLevel: asyncAction(editLevel, dispatch),
  details
})

export default withLocalize(connect(null, mapDispatchToProps)(EditLevelForm))
