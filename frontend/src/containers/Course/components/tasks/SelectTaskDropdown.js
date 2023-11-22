import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Header, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { editTask } from '../../actions/tasks'
import dndItem from '../../../../utils/components/DnDItem'
import asyncAction from '../../../../utils/asyncAction'

const DnDItem = dndItem('task')

const searchFilter = (options, query) => {
  const re = new RegExp(_.escapeRegExp(query), 'i')
  return options.filter((opt) => re.test(opt.searchlabel))
}

const SelectTaskDropdown = (props) => {
  const dispatch = useDispatch()

  const moveTask = async () => {
    asyncAction(editTask, dispatch)
  }

  const { t } = useTranslation('translation', {
    keyPrefix: 'course.tasks.selectTaskDropdown',
  })

  const tasks = props.tasks.sort((a, b) => a.order - b.order)

  const slots = tasks.map((task, index) => ({
    previous: index > 0 ? (tasks[index - 1].order + task.order) / 2 : task.order - 1,
    next: index + 1 < tasks.length ? (tasks[index + 1].order + task.order) / 2 : task.order + 1,
  }))

  return (
    <div>
      <Header as="h2">
        <Dropdown
          fluid
          selection
          options={[{ key: 0, text: '', value: null }].concat(
            tasks.map((task, index) => ({
              key: task.id,
              searchlabel: task.name,
              text: (
                <DnDItem element={task} mover={moveTask} slots={slots[index]}>
                  <div style={{ margin: '-11px 0px -11px 0px', padding: '8px 0px 8px 0px' }}>{task.name}</div>
                </DnDItem>
              ),
              value: task.id,
            }))
          )}
          placeholder={t('placeholder')}
          scrolling
          search={searchFilter}
          selectOnBlur={false}
          value={props.activeTask ? props.activeTask.id : null}
          onChange={props.handleActiveTask}
          icon={{ name: 'search' }}
          className="squareBottom"
        />
      </Header>
    </div>
  )
}
/*
SelectTaskDropdown.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired
  })).isRequired,
  activeTask: PropTypes.shape({
    id: PropTypes.number.isRequired,
    defaultMultiplier: PropTypes.number
  }),
  changeActive: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  moveTask: PropTypes.func.isRequired
}
*/

export default connect()(SelectTaskDropdown)
