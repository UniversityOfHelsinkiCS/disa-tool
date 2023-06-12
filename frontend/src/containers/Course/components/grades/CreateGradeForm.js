import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Form, Input, Label, Dropdown } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { addGrade } from '../../actions/grades'

import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import InfoBox from '../../../../utils/components/InfoBox'

const CreateGradeForm = (props) => {
    const [values, setValues] = useState({})

    addGradeSubmit = (e) =>
        this.props.addGrade({
            eng_name: e.target.eng_name.value,
            fin_name: e.target.fin_name.value,
            swe_name: e.target.swe_name.value,
            skill_level_id: this.state.values.skill_level,
            needed_for_grade: e.target.needed_for_grade.value,
            prerequisite: this.state.values.prerequisite,
            order: this.props.newOrder,
        })

    changeDropdown =
        (field) =>
        (e, { value }) =>
            this.setState({
                values: {
                    ...this.state.values,
                    [field]: value,
                },
            })

    translate = (id) =>
        this.props.translate(`Course.grades.CreateGradeForm.${id}`)

    const label = {
        name: this.translate('grade'),
        skill_level: this.translate('skill_level'),
        needed_for_grade: this.translate('needed_for_grade'),
        prerequisite: this.translate('prerequisite'),
    }
    return (
        <div className="CreateGradeForm">
            <ModalForm
                header={
                    <Fragment>
                        {this.translate('header')}
                        <InfoBox
                            translateFunc={this.props.translate}
                            translationid="AddGradeModal"
                            buttonProps={{ floated: 'right' }}
                        />
                    </Fragment>
                }
                trigger={
                    <Button
                        basic
                        className="addGradeButton"
                        icon={{ name: 'add' }}
                    />
                }
                actions={saveActions(this.translate)}
                onSubmit={this.addGradeSubmit}
            >
                <MultilingualField field="name" fieldDisplay={label.name} />
                <Form.Field>
                    <Label content={label.skill_level} />
                    <Dropdown
                        value={this.state.values.skill_level}
                        onChange={this.changeDropdown('skill_level')}
                        selection
                        options={this.props.levels.map((level) => ({
                            key: level.id,
                            value: level.id,
                            text: level.name,
                        }))}
                    />
                </Form.Field>
                <Form.Field>
                    <Label content={label.needed_for_grade} />
                    <Input
                        name="needed_for_grade"
                        type="number"
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </Form.Field>
                <Form.Field>
                    <Label content={label.prerequisite} />
                    <Dropdown
                        value={this.state.values.prerequisite}
                        onChange={this.changeDropdown('prerequisite')}
                        selection
                        options={[{ key: 0, value: null, text: '' }].concat(
                            this.props.grades.map((grade) => ({
                                key: grade.id,
                                value: grade.id,
                                text: grade.name,
                            }))
                        )}
                    />
                </Form.Field>
            </ModalForm>
        </div>
    )
}

CreateGradeForm.propTypes = {
    levels: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    grades: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    addGrade: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    newOrder: PropTypes.number.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addGrade: asyncAction(addGrade, dispatch),
})

export default connect(null, mapDispatchToProps)(CreateGradeForm)
