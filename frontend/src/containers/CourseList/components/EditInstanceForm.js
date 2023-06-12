import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button } from 'semantic-ui-react'
import asyncAction from '../../../utils/asyncAction'

import { details } from '../../../api/courseInstances'
import { editInstance } from '../actions/courseInstances'

import ModalForm, { saveActions } from '../../../utils/components/ModalForm'
import MultilingualField from '../../../utils/components/MultilingualField'

export class EditInstanceForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            values: {
                name: {
                    eng: '',
                    fin: '',
                    swe: '',
                },
            },
            loading: true,
            triggered: false,
        }
    }

    editInstanceSubmit = (e) => {
        this.props.editInstance({
            id: this.props.course_instance_id,
            eng_name: e.target.eng_name.value,
            fin_name: e.target.fin_name.value,
            swe_name: e.target.swe_name.value,
        })
        this.setState({
            triggered: false,
            loading: true,
        })
    }

    loadDetails = async () => {
        if (this.state.triggered) return
        this.setState({ triggered: true })
        const instanceDetails = (
            await details({
                id: this.props.course_instance_id,
            })
        ).data.data
        this.setState({
            values: {
                name: {
                    eng: instanceDetails.eng_name,
                    fin: instanceDetails.fin_name,
                    swe: instanceDetails.swe_name,
                },
            },
            loading: false,
        })
    }

    translate = (id) => this.props.t(`CourseList.EditInstanceForm.${id}`)

    render() {
        const contentPrompt = t('prompt_1')
        return (
            <div className="EditInstanceForm">
                <ModalForm
                    header={t('header')}
                    trigger={
                        <Button
                            type="button"
                            basic
                            circular
                            icon={{ name: 'edit' }}
                        />
                    }
                    onSubmit={this.editInstanceSubmit}
                    actions={saveActions(this.translate)}
                    loading={this.state.loading}
                    onOpen={this.loadDetails}
                >
                    <p>{contentPrompt}.</p>
                    <MultilingualField
                        field="name"
                        fieldDisplay={t('name')}
                        values={this.state.values.name}
                    />
                </ModalForm>
            </div>
        )
    }
}

EditInstanceForm.propTypes = {
    course_instance_id: PropTypes.number.isRequired,
    editInstance: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    editInstance: asyncAction(editInstance, dispatch),
})

export default connect(null, mapDispatchToProps)(EditInstanceForm)
