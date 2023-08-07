import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect,useDispatch } from 'react-redux'
import ModalForm, { saveActions } from '../../../utils/components/ModalForm'
import { addOpenQuestion } from '../actions/selfAssesment'
import MultilingualField from '../../../utils/components/MultilingualField'
import { useTranslation } from 'react-i18next'

const AddOpenQuestion = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('selfAssessmentForm.addOpenQuestion')

  const createQuestion = e => {
    dispatch(addOpenQuestion({
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value
    }))
  }
  return (
    <ModalForm
      header={t('addButton')}
      trigger={<span><Button positive>{t('addButton')}</Button></span>}
      actions={saveActions(t)}
      onSubmit={createQuestion}
    >
      <MultilingualField
        field="name"
        fieldDisplay={t('questionDisplay')}
      />
    </ModalForm>
  )
}
/*
AddOpenQuestion.propTypes = {
  dispatchAddOpenQuestion: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}
*/
export default connect()(AddOpenQuestion)
