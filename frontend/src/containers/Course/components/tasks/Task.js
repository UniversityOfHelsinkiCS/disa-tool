import React from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { withLocalize } from 'react-localize-redux'
import { Grid, Segment, Header } from 'semantic-ui-react'

import asyncAction from '../../../../utils/asyncAction'
import { removeTask } from '../../actions/tasks'
import DeleteForm from '../../../../utils/components/DeleteForm'
import EditTaskForm from './EditTaskForm'
import MathJaxText from '../../../../utils/components/MathJaxText'
import EditTaskObjectivesForm from './EditTaskObjectivesForm'
import { getCourseInstanceDataAction } from '../../../../actions/actions'
import { useTranslation } from 'react-i18next'

export const Task = (props) => {

  const {t} = useTranslation("translation", { keyPrefix: 'course.tasks.task' })
  const dispatch = useDispatch()
  
  const removeTaskAsync = async ({id}) => {
    asyncAction(removeTask(id), dispatch)
  }

    return (
      <Segment
        className="Task"
        textAlign="center"
        style={{ padding: '2px' }}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column width={14}>
              <Header style={{ marginTop: '5px' }}>{props.task.name}</Header>
            </Grid.Column>
            <Grid.Column width={1}>
              <DeleteForm
                onExecute={() => {
                  removeTaskAsync({ id: props.task.id })
                    .then(() => { dispatch(updateCourseInfo(props.courseId)) })
                }}
                prompt={[
                  t('deletePrompt1'),
                  `"${props.task.name}"`
                ]}
                header={t('deleteHeader')}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={13}>
              <MathJaxText content={props.task.description} />
              <p><b>{t('info')}: </b>{props.task.info}</p>
              <p><b>{t('maxPoints')}: </b>{props.task.max_points}</p>
            </Grid.Column>
            <Grid.Column stretched width={3} verticalAlign="middle">
              <div className="taskControlButton">
                <EditTaskForm taskId={props.task.id} />
              </div>
              <div className="taskControlButton">
                <EditTaskObjectivesForm
                  taskId={props.task.id}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
/*
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    max_points: PropTypes.number.isRequired
  }).isRequired,
  removeTask: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired,
  updateCourseInfo: PropTypes.func.isRequired
}
*/
// TODO: CHANGE ALL DISPATCHES TO USE SAME FORMAT/TRADITION!!
/*
const mapDispatchToProps = dispatch => ({
  removeTask: asyncAction(removeTask, dispatch),
  updateCourseInfo: courseId => dispatch(getCourseInstanceDataAction(courseId))
})
*/

export default connect()(Task)
