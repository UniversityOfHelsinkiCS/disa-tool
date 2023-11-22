import React, { useState, Fragment } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { addHeader } from '../../actions/types'
import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import InfoBox from '../../../../utils/components/InfoBox'
import { useTranslation } from 'react-i18next'

export const CreateHeaderForm = (props) => {
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const addHeaderSubmit = async (e) => {
    const response = await addHeader({
      course_instance_id: props.courseId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
      order: props.newOrder
    })
    dispatch(response)
  }

  const {t} = useTranslation('translation')

    const contentPrompt = t('course.types.createHeaderForm.prompt_1')
    const label = {
      name: t('common.name')
    }
    return (
      <div className="CreateHeaderForm">
        <ModalForm
          header={<Fragment>{t('course.types.createHeaderForm.header')}<InfoBox buttonProps={{ floated: 'right' }} /></Fragment>}
          trigger={<Button basic onClick={() => setExpanded(!expanded)} className="addHeaderButton" icon={{ name: 'add' }} />}
          actions={saveActions(t)}
          onSubmit={addHeaderSubmit}
        >
          <p>{contentPrompt}.</p>
          <MultilingualField field="name" fieldDisplay={label.name}/>
        </ModalForm>
      </div>
    )
  }
/*
CreateHeaderForm.propTypes = {
  addHeader: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  newOrder: PropTypes.number.isRequired
}
*/

export default connect()(CreateHeaderForm)
