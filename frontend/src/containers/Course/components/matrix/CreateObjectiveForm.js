import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { addObjective } from '../../actions/objectives'

import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'

const CreateObjectiveForm = (props) => {
    const { t } = useTranslation()
    const addObjectiveSubmit = (e) => {
        props.addObjective({
            eng_name: e.target.eng_name.value,
            fin_name: e.target.fin_name.value,
            swe_name: e.target.swe_name.value,
            skill_level_id: props.level.id,
            category_id: props.category.id,
            course_instance_id: props.courseId,
            order: props.newOrder,
        })
    }

    const translate = (id) => t(`Course.matrix.CreateObjectiveForm.${id}`)

    const contentPrompt = [
        translate('prompt_1'),
        `"${props.category.name}"`,
        translate('prompt_2'),
        `"${props.level.name}"`,
    ].join(' ')
    return (
        <div className="CreateObjectiveForm">
            <ModalForm
                header={translate('header')}
                trigger={
                    <Button
                        basic
                        className="addObjectiveButton"
                        icon={{ name: 'add' }}
                    />
                }
                actions={saveActions(translate)}
                onSubmit={addObjectiveSubmit}
            >
                <p>{contentPrompt}.</p>
                <MultilingualField
                    field="name"
                    fieldDisplay={translate('name')}
                />
            </ModalForm>
        </div>
    )
}

CreateObjectiveForm.propTypes = {
    addObjective: PropTypes.func.isRequired,
    level: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    courseId: PropTypes.number.isRequired,
    translate: PropTypes.func.isRequired,
    newOrder: PropTypes.number.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
    category: ownProps.category,
    level: state.level.levels.find((level) => level.id === ownProps.levelId),
})

const mapDispatchToProps = (dispatch) => ({
    addObjective: asyncAction(addObjective, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateObjectiveForm)
