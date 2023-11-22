import React, { Fragment } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button, Grid, Form, Input, Label } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { addTask } from '../../actions/tasks'
import ModalForm, { saveActions } from '../../../../utils/components/NewModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'
import { getCourseInstanceDataAction } from '../../../../actions/actions'
import InfoBox from '../../../../utils/components/InfoBox'

export const AddTaskForm = ({ courseId, newOrder }) => {
  const dispatch = useDispatch()

  const addTaskSubmit = async (e) => {
    const addTaskPromise = await addTask({
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value,
      eng_description: e.target.eng_description.value,
      fin_description: e.target.fin_description.value,
      swe_description: e.target.swe_description.value,
      info: e.target.info.value,
      max_points: e.target.points.value,
      course_instance_id: courseId,
      order: newOrder,
    })
    await dispatch(addTaskPromise)

    await getCourseInstanceDataAction(courseId, dispatch)
  }

  const { t } = useTranslation('translation', {
    keyPrefix: 'course.tasks',
  })

  const contentPrompt = t('addTaskForm.prompt1')
  const label = {
    name: t('common.name'),
    description: t('common.description'),
    info: t('task.info'),
    maxPoints: t('task.maxPoints'),
  }
  return (
    <Grid.Row>
      <Grid.Column>
        <div className="AddTaskForm">
          <ModalForm
            header={
              <>
                {t('addTaskForm.header')}
                <InfoBox translateFunc={t} translationid="AddTaskModal" buttonProps={{ floated: 'right' }} />
              </>
            }
            trigger={<Button basic className="addTaskButton" data-testid="add-button" icon={{ name: 'add' }} />}
            actions={saveActions(t)}
            onSubmit={addTaskSubmit}
          >
            <p>{contentPrompt}.</p>
            <MultilingualField required field="name" data-testid="add-form-name-field" fieldDisplay={label.name} />
            <MultilingualField
              field="description"
              data-testid="add-form-description-field"
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
/*
AddTaskForm.propTypes = {
  courseId: PropTypes.number.isRequired,
  addTask: PropTypes.func.isRequired,
  updateCourseInfo: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  newOrder: PropTypes.number.isRequired
}
*/

export default connect()(AddTaskForm)
