import React, { useState } from 'react'
import { connect ,useDispatch} from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import { Button, Grid, Form, Input, Label } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

import { editTask } from '../../actions/tasks'
import { details } from '../../../../api/tasks'

import ModalForm, { saveActions } from '../../../../utils/components/ModalForm'
import MultilingualField from '../../../../utils/components/MultilingualField'

import './tasks.css'

export const EditTaskForm = (props) => {
  const dispatch = useDispatch()

  const [values, setValues] = useState({
        name: {
          eng: '',
          fin: '',
          swe: ''
        },
        description: {
          eng: '',
          fin: '',
          swe: ''
        },
        info: '',
        maxPoints: 0
      ,
      loading: true
    }
  )

 const editTaskSubmit = async (e) => {
  const editTaskData = await editTask({
    id: props.taskId,
    eng_name: e.target.eng_name.value,
    fin_name: e.target.fin_name.value,
    swe_name: e.target.swe_name.value,
    eng_description: e.target.eng_description.value,
    fin_description: e.target.fin_description.value,
    swe_description: e.target.swe_description.value,
    info: e.target.info.value,
    max_points: e.target.points.value
  })
  dispatch({type: editTaskData.type, response: editTaskData.response})
  }

 const loadDetails = async () => {
    const taskDetails = (await details({
      id: props.taskId
    })).data.data
    setValues({
      ...values,
        name: {
          eng: taskDetails.eng_name,
          fin: taskDetails.fin_name,
          swe: taskDetails.swe_name
        },
        description: {
          eng: taskDetails.eng_description,
          fin: taskDetails.fin_description,
          swe: taskDetails.swe_description
        },
        info: taskDetails.info,
        maxPoints: taskDetails.max_points,
      loading: false
    })
  }

  const { t, i18n } = useTranslation('translation')

    const contentPrompt = t('course.tasks.editTaskForm.prompt1')
    const label = {
      name: t('common.name'),
      description: t('course.tasks.common.description'),
      info: 'info',
      maxPoints: 'max points'
    }

    return (
      <Grid.Row>
        <Grid.Column>
          <div className="EditTaskForm">
            <ModalForm
              header={t('course.tasks.editTaskForm.header')}
              trigger={<Button
                basic
                className="editTaskButton"
                content={t('course.tasks.editTaskForm.trigger')}
                onClick={loadDetails}
              />}
              actions={saveActions(t)}
              onSubmit={editTaskSubmit}
              loading={values.loading}
            >
              <p>{contentPrompt}.</p>
              <MultilingualField required field="name" fieldDisplay={label.name} values={values.name} />
              <MultilingualField field="description" fieldDisplay={label.description} values={values.description} />
              <Form.Field>
                <Label>{label.info}</Label>
                <Input
                  name="info"
                  type="text"
                  value={values.info}
                  onChange={e => setValues({
                    ...values, info: e.target.value 
                  })}
                />
              </Form.Field>
              <Form.Field>
                <Label>{label.maxPoints}</Label>
                <Form.Input
                  name="points"
                  type="number"
                  value={values.maxPoints}
                  onChange={e => setValues({
                   ...values, maxPoints: e.target.value 
                  })}
                  required
                />
              </Form.Field>
            </ModalForm>
          </div>
        </Grid.Column>
      </Grid.Row>
    )
  }
/*
EditTaskForm.propTypes = {
  taskId: PropTypes.number.isRequired,
  editTask: PropTypes.func.isRequired,
  details: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired
}
*/

export default withLocalize(connect()(EditTaskForm))
