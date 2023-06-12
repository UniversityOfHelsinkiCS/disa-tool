import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Table, Button } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { addCategory } from '../../actions/categories'

import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'

export class CreateCategoryForm extends Component {
    addCategorySubmit = (e) => {
        this.props.addCategory({
            course_instance_id: this.props.courseId,
            eng_name: e.target.eng_name.value,
            fin_name: e.target.fin_name.value,
            swe_name: e.target.swe_name.value,
            order: this.props.newOrder,
        })
    }

    translate = (id) =>
        this.props.translate(`Course.matrix.CreateCategoryForm.${id}`)

    render() {
        const contentPrompt = this.translate('prompt_1')
        return (
            <Table.Row className="CreateCategoryForm">
                <Table.Cell colSpan={this.props.colSpan}>
                    <ModalForm
                        header={this.translate('header')}
                        trigger={
                            <Button
                                basic
                                className="addCategoryButton"
                                icon={{ name: 'add' }}
                            />
                        }
                        actions={saveActions(this.translate)}
                        onSubmit={this.addCategorySubmit}
                    >
                        <p>{contentPrompt}.</p>
                        <MultilingualField
                            field="name"
                            fieldDisplay={this.translate('name')}
                        />
                    </ModalForm>
                </Table.Cell>
            </Table.Row>
        )
    }
}

CreateCategoryForm.propTypes = {
    courseId: PropTypes.number.isRequired,
    addCategory: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    newOrder: PropTypes.number.isRequired,
    colSpan: PropTypes.number.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addCategory: asyncAction(addCategory, dispatch),
})

export default connect(null, mapDispatchToProps)(CreateCategoryForm)
