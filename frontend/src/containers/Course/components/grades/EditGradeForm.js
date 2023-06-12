import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Form, Input, Dropdown, Label } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { details } from '../../../../api/grades'
import { editGrade } from '../../actions/grades'

import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import InfoBox from '../../../../utils/components/InfoBox'

const EditGradeForm = (props) => {
    const { t } = useTranslation('common')
    const [loading, setLoading] = useState(true)
    const [values, setValues] = useState({
        name: {
            eng: '',
            fin: '',
            swe: '',
        },
        skill_level: null,
        needed_for_grade: 0,
        prerequisite: null,
    })

    const editGradeSubmit = (e) =>
        props.editGrade({
            id: props.gradeId,
            eng_name: e.target.eng_name.value,
            fin_name: e.target.fin_name.value,
            swe_name: e.target.swe_name.value,
            skill_level_id: values.skill_level,
            needed_for_grade: values.needed_for_grade,
            prerequisite: values.prerequisite,
        })

    const loadDetails = async () => {
        if (!loading) return
        const gradeDetails = (await props.details({ id: props.gradeId })).data
            .data
        setLoading(false)
        setValues({
            ...values,
            name: {
                eng: gradeDetails.eng_name,
                fin: gradeDetails.fin_name,
                swe: gradeDetails.swe_name,
            },
            skill_level: gradeDetails.skill_level_id,
            needed_for_grade: gradeDetails.needed_for_grade,
            prerequisite: gradeDetails.prerequisite,
        })
    }

    const changeValue =
        (field) =>
        (e, { value }) =>
            setValues({
                ...values,
                [field]: value,
            })

    const translate = (id) => t(`Course.grades.EditGradeForm.${id}`)

    const label = {
        name: t('grade'),
        skill_level: t('skill_level'),
        needed_for_grade: t('needed_for_grade'),
        prerequisite: t('prerequisite'),
    }
    return (
        <div className="EditGradeForm">
            <ModalForm
                header={
                    <Fragment>
                        {t('header')}
                        <InfoBox
                            translateFunc={translate}
                            translationid="EditGradeModal"
                            buttonProps={{ floated: 'right' }}
                        />
                    </Fragment>
                }
                trigger={
                    <Button
                        basic
                        circular
                        icon={{ name: 'edit' }}
                        size="small"
                        onClick={loadDetails}
                    />
                }
                actions={saveActions(translate)}
                onSubmit={editGradeSubmit}
                loading={loading}
            >
                <MultilingualField
                    field="name"
                    fieldDisplay={label.name}
                    values={values.name}
                />
                <Form.Field>
                    <Label content={label.skill_level} />
                    <Dropdown
                        value={values.skill_level}
                        onChange={changeValue('skill_level')}
                        selection
                        options={props.levels.map((level) => ({
                            key: level.id,
                            value: level.id,
                            text: level.name,
                        }))}
                    />
                </Form.Field>
                <Form.Field>
                    <Label content={label.needed_for_grade} />
                    <Input
                        value={values.needed_for_grade}
                        onChange={changeValue('needed_for_grade')}
                        type="number"
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </Form.Field>
                <Form.Field>
                    <Label content={label.prerequisite} />
                    <Dropdown
                        value={values.prerequisite}
                        onChange={changeValue('prerequisite')}
                        selection
                        options={[{ key: 0, value: null, text: '' }].concat(
                            props.grades.map((grade) => ({
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

EditGradeForm.propTypes = {
    details: PropTypes.func.isRequired,
    editGrade: PropTypes.func.isRequired,
    gradeId: PropTypes.number.isRequired,
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
    translate: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    details,
    editGrade: asyncAction(editGrade, dispatch),
})

export default connect(null, mapDispatchToProps)(EditGradeForm)
