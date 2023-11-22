import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Prompt } from 'react-router'
import { Accordion, Button, Grid, Segment } from 'semantic-ui-react'

import UploadResponsesPage from '../TaskResponses/UploadResponsesPage'
import { postTaskResponseActions } from '../../actions/actions'
import TaskResponseTypeTable from './TaskResponseTypeTable'
import TaskResponseEditTable from './TaskResponseEditTable'
import InfoBox from '../../utils/components/InfoBox'

const TaskResponseEdit = (props) => {
  const dispatch = useDispatch()
  const activeCourse = useSelector((state) => state.instance)
  const [selectedType, setSelectedType] = useState(undefined)
  const [updatedTasks, setUpdatedTasks] = useState([])
  const [popUp, setPopUp] = useState({ show: false, task: undefined, person: undefined })

  const { tasks, students } = props

  const selectType = (e, { type }) => {
    setSelectedType(selectedType === type ? undefined : type)
  }

  const markTask = async (e, { task, person }) => {
    const taskUpdated = updatedTasks.find((t) => t.taskId === task.id && t.personId === person.id)
    if (taskUpdated) {
      setPopUp({ show: true, task: taskUpdated, person })
    } else if (task.task_id && task.person_id && task.points) {
      const existingTask = {
        responseId: task.id,
        taskId: task.task_id,
        personId: task.person_id,
        points: task.points,
      }
      setUpdatedTasks([...updatedTasks, existingTask])
      setPopUp({ show: true, task: existingTask, person })
    } else {
      setUpdatedTasks([...updatedTasks, { taskId: task.id, personId: person.id, points: task.max_points }])
    }
  }

  const updateTask = (e, { task }) => {
    switch (e.target.name) {
      case 'input':
        setPopUp({
          ...popUp,
          show: true,
          task: { ...popUp.task, points: e.target.value },
          person: popUp.person,
        })
        break
      case 'update': {
        const filteredTasks = updatedTasks.filter((et) => et.taskId !== task.taskId || et.personId !== task.personId)
        // input values are always strings, so convert to number
        task.points = Number(task.points)
        filteredTasks.push(task)
        setUpdatedTasks(filteredTasks)
        setPopUp({ ...popUp, show: false })
        break
      }
      case 'reset': {
        const filteredTasks = updatedTasks.filter((et) => et.taskId !== task.taskId || et.personId !== task.personId)
        setUpdatedTasks(filteredTasks)
        setPopUp({ ...popUp, show: false })
        break
      }
      default:
        setPopUp({ ...popUp, show: false })
    }
  }

  const updateTasksFromFile = (updatedTasks) => {
    setUpdatedTasks(updatedTasks)
  }

  const submitTaskUpdates = async () => {
    const response = await postTaskResponseActions(
      {
        tasks: updatedTasks,
        courseId: activeCourse.id,
      },
      dispatch
    )
    setUpdatedTasks([])
  }

  return (
    <Grid style={{ overflowX: 'auto' }}>
      <Prompt when={updatedTasks.length > 0} message="Sinulla on tallentamattomia muutoksia" />
      <Grid.Row>
        <Grid.Column>
          <Accordion
            defaultActiveIndex={-1}
            styled
            fluid
            panels={[
              {
                key: 'UploadComponent',
                title: 'Lataa tehtäviä csv-tiedostosta',
                content: {
                  key: 'uploader',
                  content: <UploadResponsesPage activeCourse={activeCourse} updateHandler={updateTasksFromFile} />,
                },
              },
            ]}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <InfoBox translationid="TasksInspect" buttonProps={{ floated: 'right' }} />
            <Button color="green" content="Tallenna muutokset" onClick={submitTaskUpdates} />
            <Button color="red" content="Peru kaikki muutokset" onClick={() => setState({ updatedTasks: [] })} />
            {!selectedType ? (
              <TaskResponseTypeTable
                typeHeaders={activeCourse.type_headers}
                students={students}
                tasks={tasks}
                selectType={selectType}
                updatedTasks={updatedTasks}
              />
            ) : (
              <TaskResponseEditTable
                tasks={tasks}
                students={students}
                selectType={selectType}
                selectedType={selectedType}
                markTask={markTask}
                updateTask={updateTask}
                updatedTasks={updatedTasks}
                popUp={popUp}
              />
            )}
            <Button color="green" content="Tallenna muutokset" onClick={submitTaskUpdates} />
            <Button color="red" content="Peru kaikki muutokset" onClick={() => setUpdatedTasks([])} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default connect()(TaskResponseEdit)
