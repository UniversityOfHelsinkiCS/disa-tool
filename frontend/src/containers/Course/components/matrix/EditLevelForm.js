import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { details } from '../../../../api/skillLevels'
import { editLevel } from '../../actions/levels'

import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'

class EditLevelForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            values: {
                name: {
                    eng: '',
                    fin: '',
                    swe: '',
                },
            },
        }
    }

    editLevelSubmit = (e) =>
        this.props.editLevel({
            id: this.props.levelId,
            eng_name: e.target.eng_name.value,
            fin_name: e.target.fin_name.value,
            swe_name: e.target.swe_name.value,
        })

    loadDetails = async () => {
        const levelDetails = (
            await this.props.details({
                id: this.props.levelId,
            })
        ).data.data
        this.setState({
            loading: false,
            values: {
                name: {
                    eng: levelDetails.eng_name,
                    fin: levelDetails.fin_name,
                    swe: levelDetails.swe_name,
                },
            },
        })
    }

    translate = (id) => this.props.t(`Course.matrix.EditLevelForm.${id}`)

    render() {
        return (
            <div className="EditLevelForm">
                <ModalForm
                    header={t('header')}
                    trigger={
                        <Button
                            basic
                            circular
                            onClick={this.loadDetails}
                            icon={{ name: 'edit' }}
                            size="mini"
                        />
                    }
                    onSubmit={this.editLevelSubmit}
                    loading={this.state.loading}
                    actions={saveActions(this.translate)}
                >
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

EditLevelForm.propTypes = {
    editLevel: PropTypes.func.isRequired,
    levelId: PropTypes.number.isRequired,
    details: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    editLevel: asyncAction(editLevel, dispatch),
    details,
})

export default connect(null, mapDispatchToProps)(EditLevelForm)
