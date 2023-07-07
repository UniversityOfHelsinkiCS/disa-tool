import React, { useState,useEffect } from 'react'
import { connect, useSelector ,useDispatch} from 'react-redux'
import { Container, Segment } from 'semantic-ui-react'
import {useTranslation } from 'react-i18next'

import Task from './Task'
import Matrix from '../matrix/Matrix'
import Headerlist from '../types/Headerlist'
import SelectTaskDropdown from './SelectTaskDropdown'
import SingleAccordion from './SingleAccordion'
import TypesDisplay from './TypesDisplay'
import AddTaskForm from './AddTaskForm'
import InfoBox from '../../../../utils/components/InfoBox'

export const EditTasksTab = () => {
  const [activeTask, setActiveTask] = useState(null)
  const task = useSelector(state => state.task)
  const {course} = useSelector(state => state.course)
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'course',
})

 useEffect(() => {
  task.active === null ? (
    null
  ) : (
    task.tasks.find(task => task.id === task.active)
  )
 },[])

 const  changeActive = (e, { value }) => {
    dispatch(changeActive(value))
  }
    return (
      <div className="editTasksTab">
        <Container>
          <Segment clearing basic>
            <InfoBox translationid="editTasksPage" buttonProps={{ floated: 'right' }} />
          </Segment>
        </Container>
        <Container style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
            <SelectTaskDropdown
              tasks={task.tasks}
              activeTask={activeTask}
              changeActive={changeActive}
            />
          </div>
          <div>
            <AddTaskForm
              courseId={course.id}
              newOrder={task.tasks.reduce(
                (acc, { order }) => Math.max(acc, order),
                0
              ) + 1}
            />
          </div>
        </Container>
        {activeTask ? (
          <Container>
            <Task task={activeTask} courseId={course.id} />
          </Container>
        ) : null}
        <Container>
          <SingleAccordion
            title={(
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '20px' }}>Types</span>
                {activeTask ? (
                  <TypesDisplay
                    defaultText={t('tasks.editTasksTab.default')}
                    defaultMultiplier={activeTask.defaultMultiplier}
                    types={activeTask.types}
                  />
                ) : null}
              </div>
            )}
          >
            <Headerlist
              courseId={course.id}
              editing={false}
            />
          </SingleAccordion>
        </Container>
        <Container>
          <SingleAccordion title={t('common.matrix')}>
            <div style={{ overflowX: 'auto' }}>
              <Matrix editing={false} showDetails />
            </div>
          </SingleAccordion>
        </Container>
      </div>
    )
  }
/*
EditTasksTab.propTypes = {
  courseId: PropTypes.number.isRequired,
  changeActive: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeTask: PropTypes.shape({
    id: PropTypes.number.isRequired,
    defaultMultiplier: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.number).isRequired
  }),
  translate: PropTypes.func.isRequired
}
*/

export default connect()(EditTasksTab)
