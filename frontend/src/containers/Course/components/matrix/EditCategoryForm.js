import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { details } from '../../../../api/categories'
import { editCategory } from '../../actions/categories'

import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'

const EditCategoryForm = (props) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [values, setValues] = useState({
        eng: '',
        fin: '',
        swe: '',
    })

    const editCategorySubmit = (e) =>
        editCategory({
            id: props.categoryId,
            eng_name: e.target.eng_name.value,
            fin_name: e.target.fin_name.value,
            swe_name: e.target.swe_name.value,
        })

    const loadDetails = async () => {
        const categoryDetails = (
            await details({
                id: props.categoryId,
            })
        ).data.data
        setLoading(false)
        setValues({
            eng: categoryDetails.eng_name,
            fin: categoryDetails.fin_name,
            swe: categoryDetails.swe_name,
        })
    }

    const translate = (id) => t(`Course.matrix.EditCategoryForm.${id}`)

    return (
        <div className="EditCategoryForm">
            <ModalForm
                header={t('header')}
                trigger={
                    <Button
                        basic
                        circular
                        onClick={loadDetails}
                        icon={{ name: 'edit' }}
                        size="mini"
                    />
                }
                actions={saveActions(translate)}
                onSubmit={editCategorySubmit}
                loading={loading}
            >
                <MultilingualField
                    field="name"
                    fieldDisplay={t('name')}
                    values={values}
                />
            </ModalForm>
        </div>
    )
}

EditCategoryForm.propTypes = {
    editCategory: PropTypes.func.isRequired,
    categoryId: PropTypes.number.isRequired,
    details: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    editCategory: asyncAction(editCategory, dispatch),
    details,
})

export default connect(null, mapDispatchToProps)(EditCategoryForm)
