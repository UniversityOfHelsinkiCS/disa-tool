import React, { useState, useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Button, Label, Popup, Header, Loader, Segment, Grid } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { useDrag } from 'react-dnd'
import { removeObjective, editObjective } from '../../actions/objectives'
import { addObjectiveToTask, removeObjectiveFromTask } from '../../actions/tasks'
import { taskDetails } from '../../../../api/objectives'
import EditObjectiveForm from './EditObjectiveForm'
import DeleteForm from '../../../../utils/components/DeleteForm'
import MathJaxText from '../../../../utils/components/MathJaxText'
import DnDItem from '../../../../utils/components/DnDItem'

export const MatrixObjective = ({
  activeTaskId = null,
  showDetails = false,
  objective,
  editing,
  active,
  categoryId,
  skillLevelId,
  slots,
}) => {
  const [triggered, setTriggered] = useState(false)
  const [loading, setLoading] = useState(true)
  const [cumulativeMultiplier, setCumulativeMultiplier] = useState(0)
  const [tasks, setTasks] = useState([])
  const lastMultiplierUpdate = useSelector((state) => state.task.lastMultiplierUpdate)
  const dispatch = useDispatch()

  const [{ isDragging }, drag, dragPreview] = useDrag(
    {
      type: 'objective',
      item: {
        type: 'objective',
        id: objective.id,
        order: objective.order,
        category_id: categoryId,
        skill_level_id: skillLevelId,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [],
  )

  const reset = () => {
    setTriggered(false)
    setLoading(true)
  }

  const asyncRemoveObjective = async (props) => {
    const response = await removeObjective(props)
    dispatch(response)
  }

  const asyncToggleObjective = async (props) => {
    let response = null
    if (active) {
      response = await removeObjectiveFromTask(props)
    } else {
      response = await addObjectiveToTask(props)
    }
    dispatch(response)
  }

  const asyncTaskDetails = async (props) => {
    const response = await taskDetails(props)
    return response
  }

  const asyncMoveObjective = async (props) => {
    const response = await editObjective(props)
    dispatch(response)
  }

  useEffect(() => {
    if (triggered) {
      reset()
    }
  }, [lastMultiplierUpdate])

  const toggleObjective = () => {
    if (activeTaskId !== null) {
      asyncToggleObjective({
        objective_id: objective.id,
        task_id: activeTaskId,
      })
    }
  }

  const loadDetails = async () => {
    if (triggered) {
      return
    }
    setTriggered(true)
    const objectiveDetails = (await asyncTaskDetails({ id: objective.id })).data.data
    let cumMultiplier = 0
    objectiveDetails.tasks.forEach((task) => {
      cumMultiplier += task.multiplier
    })
    setCumulativeMultiplier(cumMultiplier)
    setTasks(objectiveDetails.tasks)
    setLoading(false)
  }

  const { t } = useTranslation('translation')

  const labels = {
    cumulative: 'course.matrix.matrixObjective.cumulative',
    delete_prompt_1: 'course.matrix.matrixObjective.delete_prompt_1',
    delete_header: 'course.matrix.matrixObjective.delete_header',
  }
  const content = (
    <div className="flexContainer">
      <div className="objectiveBlock flexContainer">
        {showDetails ? (
          <Button
            className="objectiveButton"
            toggle
            active={active}
            compact
            basic
            fluid
            style={{ borderRadius: '0px', cursor: activeTaskId ? undefined : 'default' }}
            onClick={toggleObjective}
          >
            <MathJaxText content={objective.name} />
          </Button>
        ) : (
          <Segment className="objectiveSegment" style={{ borderRadius: '0px' }}>
            <MathJaxText content={objective.name} />
          </Segment>
        )}
        {showDetails ? (
          <div>
            <Popup
              trigger={
                <Label
                  size="large"
                  circular
                  content={objective.task_count}
                  onMouseOver={loadDetails}
                  onFocus={loadDetails}
                  style={{
                    color: objective.task_count === 0 ? 'red' : undefined,
                  }}
                />
              }
              content={
                loading ? (
                  <Loader active inline />
                ) : (
                  <div>
                    <div>
                      <span>{t(labels.cumulative)}</span>
                      <Label>
                        <strong>{cumulativeMultiplier.toFixed(2)}</strong>
                      </Label>
                    </div>
                    <Header>
                      <span className="capitalize">{t('common.tasks')}</span>
                    </Header>
                    <Grid>
                      {tasks.map((task) => (
                        <Grid.Row key={task.name}>
                          <Grid.Column width={12}>
                            <span>{task.name}</span>
                          </Grid.Column>
                          <Grid.Column width={4} textAlign="left">
                            <Label>{Number(task.multiplier).toFixed(2)}</Label>
                          </Grid.Column>
                        </Grid.Row>
                      ))}
                    </Grid>
                  </div>
                )
              }
            />
          </div>
        ) : null}
      </div>
      {editing ? (
        <div className="removeBlock">
          <EditObjectiveForm style={{ margin: '5px auto 5px auto' }} objectiveId={objective.id} />
          <DeleteForm
            objectiveId={objective.id}
            style={{ margin: '5px auto 5px auto' }}
            onExecute={() => asyncRemoveObjective({ id: objective.id })}
            prompt={[t(labels.delete_prompt_1), `"${objective.name}"`]}
            header={t(labels.delete_header)}
          />
        </div>
      ) : null}
    </div>
  )
  if (editing) {
    return (
      <div className="MatrixObjective" data-testid={`matrix-objective-${objective.id}`}>
        <DnDItem
          key={objective.id}
          target={{ ...objective, categoryId, skillLevelId }}
          mover={asyncMoveObjective}
          slots={slots}
          drag={drag}
          isDragging={isDragging}
          dragPreview={dragPreview}
          itemName={`matrix-objective-${objective.id}`}
        >
          {content}
        </DnDItem>
      </div>
    )
  }
  return <div className="MatrixObjective">{content}</div>
}

/*
MatrixObjective.propTypes = {
  objective: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    task_count: PropTypes.number
  }).isRequired,
  editing: PropTypes.bool.isRequired,
  removeObjective: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  toggleObjective: PropTypes.func.isRequired,
  activeTaskId: PropTypes.number,
  taskDetails: PropTypes.func.isRequired,
  showDetails: PropTypes.bool,
  lastMultiplierUpdate: PropTypes.instanceOf(Date),
  t: PropTypes.func.isRequired,
  moveObjective: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  skillLevelId: PropTypes.number.isRequired,
  slots: PropTypes.shape({
    previous: PropTypes.number.isRequired,
    next: PropTypes.number.isRequired
  }).isRequired
}
*/

export default connect()(MatrixObjective)
