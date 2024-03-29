import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { details } from '../../../../api/categories'
import { editCategory } from '../../actions/categories'
import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'

const EditCategoryForm = ({ categoryId }) => {
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState({
    eng: '',
    fin: '',
    swe: '',
  })
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')

  const editCategorySubmitAsync = async (e) => {
    const response = await editCategory({
      id: categoryId,
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
    })
    dispatch(response)
  }

  const loadDetails = async () => {
    const categoryDetails = (
      await details({
        id: categoryId,
      })
    ).data.data
    setLoading(false)
    setValues({
      eng: categoryDetails.eng_name,
      fin: categoryDetails.fin_name,
      swe: categoryDetails.swe_name,
    })
  }

  const labels = {
    header: t('course.matrix.editCategoryForm.header'),
  }

  return (
    <div className="EditCategoryForm">
      <ModalForm
        header={labels.header}
        trigger={<Button basic circular onClick={loadDetails} icon={{ name: 'edit' }} size="mini" />}
        actions={saveActions(t)}
        onSubmit={editCategorySubmitAsync}
        loading={loading}
      >
        <MultilingualField
          field="name"
          fieldDisplay={t('common.name')}
          values={values}
          type="category-form"
          id={categoryId}
        />
      </ModalForm>
    </div>
  )
}
/*
EditCategoryForm.propTypes = {
  editCategory: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  details: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}
*/
export default connect()(EditCategoryForm)
