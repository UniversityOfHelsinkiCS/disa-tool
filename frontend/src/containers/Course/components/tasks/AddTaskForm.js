import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Grid, Form, Input, Label } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { addTask } from '../../actions/tasks'

import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import { getCourseInstanceDataAction } from '../../../../actions/actions'
import InfoBox from '../../../../utils/components/InfoBox'

const AddTaskForm = (props) => {
    const { t } = useTranslation()
    const addTaskSubmit = (e) => {
        this.props
            .addTask({
                eng_name: e.target.eng_name.value,
                fin_name: e.target.fin_name.value,
                swe_name: e.target.swe_name.value,
                eng_description: e.target.eng_description.value,
                fin_description: e.target.fin_description.value,
                swe_description: e.target.swe_description.value,
                info: e.target.info.value,
                max_points: e.target.points.value,
                course_instance_id: props.courseId,
                order: props.newOrder,
            })
            .then(() => props.updateCourseInfo(props.courseId))
    }

    //     translate = (id) => this.props.t(`Course.tasks.AddTaskForm.${id}`)

    const contentPrompt = t('prompt_1')
    const label = {
        name: t('name'),
        description: t('description'),
        info: 'info',
        maxPoints: 'max points',
    }
    return (
        <Grid.Row>
            <Grid.Column>
                <div className="AddTaskForm">
                    <ModalForm
                        header={
                            <Fragment>
                                {t('header')}
                                <InfoBox
                                    translationid="AddTaskModal"
                                    buttonProps={{ floated: 'right' }}
                                />
                            </Fragment>
                        }
                        trigger={
                            <Button
                                basic
                                className="addTaskButton"
                                icon={{ name: 'add' }}
                            />
                        }
                        actions={saveActions(t)}
                        onSubmit={addTaskSubmit}
                    >
                        <p>{contentPrompt}.</p>
                        <MultilingualField
                            required
                            field="name"
                            fieldDisplay={label.name}
                        />
                        <MultilingualField
                            field="description"
                            fieldDisplay={label.description}
                        />
                        <Form.Field>
                            <Label>{label.info}</Label>
                            <Input name="info" type="text" />
                        </Form.Field>
                        <Form.Field>
                            <Label>{label.maxPoints}</Label>
                            <Form.Input required name="points" type="number" />
                        </Form.Field>
                    </ModalForm>
                </div>
            </Grid.Column>
        </Grid.Row>
    )
}

AddTaskForm.propTypes = {
    courseId: PropTypes.number.isRequired,
    addTask: PropTypes.func.isRequired,
    updateCourseInfo: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    newOrder: PropTypes.number.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addTask: asyncAction(addTask, dispatch),
    updateCourseInfo: (courseId) =>
        dispatch(getCourseInstanceDataAction(courseId)),
})

export default connect(null, mapDispatchToProps)(AddTaskForm)
