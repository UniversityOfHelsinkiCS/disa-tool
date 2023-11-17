import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import CreateObjectiveForm from './CreateObjectiveForm'
import MatrixObjective, { dropSpec } from './MatrixObjective'
import dndItem from '../../../../utils/components/DnDItem'
import { editObjective } from '../../actions/objectives'
import asyncAction from '../../../../utils/asyncAction'

const DnDItem = dndItem('objective', {
  source: false,
  dropSpec: {
    drop: (props, monitor) => {
      const { element } = props
      const drag = monitor.getItem()
      if (
        element.category_id === drag.category_id
        &&
        element.skill_level_id === drag.skill_level_id
      ) { return }
      dropSpec.drop(props, monitor)
    }
  }
})

export const MatrixLevel = ({  
  courseId= null,
  activeTaskId= null,
  showDetails = false,
  category,
  level, 
  editing, 
  activeMap, 
}) => {
  const objectives = level.objectives.sort((a, b) => a.order - b.order)
  let newOrder = 1

  const asyncEditObjective = async (props) => {
    const response = await editObjective(props)
        dispatch(response)
    }

  const objectivesNode = objectives.map((objective, index, objectivesArray) => {
    const slots = {
      previous: index > 0 ? (
        (objective.order + objectivesArray[index - 1].order) / 2
      ) : objective.order - 1,
      next: index < objectivesArray.length - 1 ? (
        (objective.order + objectivesArray[index + 1].order) / 2
      ) : objective.order + 1
    }
    if (index === objectivesArray.length - 1) { newOrder = slots.next }
    return (
      <MatrixObjective
        key={objective.id}
        objective={objective}
        editing={editing}
        active={Boolean(activeMap[objective.id])}
        activeTaskId={activeTaskId}
        showDetails={showDetails}
        categoryId={category.id}
        skillLevelId={level.id}
        slots={slots}
      />
    )
  })
  return (
    <Table.Cell textAlign="center" key={level.id} className="MatrixLevel">
      <div>
        {objectivesNode}
      </div>
      {editing ? (
        <DnDItem
          element={{
            order: newOrder,
            category_id: category.id,
            skill_level_id: level.id
          }}
          mover={asyncEditObjective}
        >
          <CreateObjectiveForm
            levelId={level.id}
            category={category}
            courseId={courseId}
            newOrder={newOrder}
          />
        </DnDItem>
      ) : null}
    </Table.Cell>
  )
}
/*
MatrixLevel.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  level: PropTypes.shape({
    id: PropTypes.number.isRequired,
    objectives: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired
    })).isRequired
  }).isRequired,
  courseId: PropTypes.number,
  editing: PropTypes.bool.isRequired,
  activeMap: PropTypes.objectOf(PropTypes.bool).isRequired,
  activeTaskId: PropTypes.number,
  showDetails: PropTypes.bool,
  moveObjective: PropTypes.func.isRequired
}
*/

export default connect()(MatrixLevel)
