import React, {  } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Table, Button } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'
import { addCategory } from '../../actions/categories'
import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import { useTranslation } from 'react-i18next'

export const CreateCategoryForm = (props) => {
  const dispatch = useDispatch()
  const addCategorySubmit = async(e) => {
    const response = await addCategory({
      course_instance_id: props.courseId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
      order: props.newOrder
    })
    dispatch(response)
  }

  const {t} = useTranslation("translation", {keyPrefix: "course.matrix.createCategoryForm"})

    return (
      <Table.Row className="CreateCategoryForm">
        <Table.Cell colSpan={props.colSpan}>
          <ModalForm
            header={t('header')}
            trigger={<Button basic className="addCategoryButton" icon={{ name: 'add' }} />}
            actions={saveActions()}
            onSubmit={addCategorySubmit}
          >
            <p>{t('prompt_1')}.</p>
            <MultilingualField field="name" fieldDisplay={t('name')} />
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
