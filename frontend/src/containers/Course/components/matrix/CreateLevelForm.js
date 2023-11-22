import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Table, Button } from 'semantic-ui-react'
import { addLevel } from '../../actions/levels'

import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import { useTranslation } from 'react-i18next'

export const CreateLevelForm = ({courseId, newOrder}) => {
  const dispatch = useDispatch()
  const addLevelSubmit = async (e) => {
    const response = await addLevel({
      course_instance_id: courseId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
      order: newOrder
    })
    dispatch(response)
  }

  const {t} = useTranslation("translation")

  const labels = {
    header: t('course.matrix.createLevelForm.header'),
    prompt_1: t('course.matrix.createLevelForm.prompt_1'),
  }

    return (
      <Table.HeaderCell className="CreateLevelForm">
        <ModalForm
          header={labels.header}
          trigger={<Button basic className="addLevelButton" icon={{ name: 'add' }} />}
          actions={saveActions()}
          onSubmit={addLevelSubmit}
        >
          <p>{labels.prompt_1}.</p>
          <MultilingualField 
          field="name" 
          fieldDisplay={t('common.name')} 
          type="level-form" 
          id={courseId}
          />
        </ModalForm>
      </Table.HeaderCell>
    )
  }
/*
CreateLevelForm.propTypes = {
  courseId: PropTypes.number.isRequired,
  addLevel: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  newOrder: PropTypes.number.isRequired
}
*/
export default connect()(CreateLevelForm)
