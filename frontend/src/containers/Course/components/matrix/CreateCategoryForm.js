import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Table, Button } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { addCategory } from '../../actions/categories'
import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'

export const CreateCategoryForm = ({ courseId, newOrder, colSpan }) => {
  const dispatch = useDispatch()
  const addCategorySubmit = async (e) => {
    const response = await addCategory({
      course_instance_id: courseId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
      order: newOrder,
    })
    dispatch(response)
  }

  const { t } = useTranslation('translation')

  const labels = {
    header: t('course.matrix.createCategoryForm.header'),
    prompt_1: t('course.matrix.createCategoryForm.prompt_1'),
  }

  return (
    <Table.Row className="CreateCategoryForm">
      <Table.Cell colSpan={colSpan}>
        <ModalForm
          header={labels.header}
          trigger={<Button basic className="addCategoryButton" icon={{ name: 'add' }} />}
          actions={saveActions()}
          onSubmit={addCategorySubmit}
        >
          <p>{labels.prompt_1}.</p>
          <MultilingualField field="name" fieldDisplay={t('common.name')} type="category-form" id={courseId} />
        </ModalForm>
      </Table.Cell>
    </Table.Row>
  )
}
/*
CreateCategoryForm.propTypes = {
  courseId: PropTypes.number.isRequired,
  addCategory: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  newOrder: PropTypes.number.isRequired,
  colSpan: PropTypes.number.isRequired
}
*/

export default connect()(CreateCategoryForm)
