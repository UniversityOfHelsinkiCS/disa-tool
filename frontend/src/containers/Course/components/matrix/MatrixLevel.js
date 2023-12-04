import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Table } from 'semantic-ui-react'

import { useDrag } from 'react-dnd'
import CreateObjectiveForm from './CreateObjectiveForm'
import MatrixObjective from './MatrixObjective'
import { editObjective } from '../../actions/objectives'
import DnDItem from '../../../../utils/components/DnDItem'

export const MatrixLevel = ({
  courseId = null,
  activeTaskId = null,
  showDetails = false,
  category,
  level,
  editing,
  activeMap,
}) => {
  const objectives = level.objectives.sort((a, b) => a.order - b.order)
  let newOrder = 1
  const dispatch = useDispatch()

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'objective',
      item: { type: 'objective' },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  )
  const asyncEditObjective = async (props) => {
    const response = await editObjective(props)
    dispatch(response)
  }

  const objectivesNode = objectives.map((objective, index, objectivesArray) => {
    const slots = {
      previous: index > 0 ? (objective.order + objectivesArray[index - 1].order) / 2 : objective.order - 1,
      next:
        index < objectivesArray.length - 1
          ? (objective.order + objectivesArray[index + 1].order) / 2
          : objective.order + 1,
    }
    if (index === objectivesArray.length - 1) {
      newOrder = slots.next
    }

    return (
      <MatrixObjective
        key={objective.order}
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
    <Table.Cell
      textAlign="center"
      key={level.id}
      className="MatrixLevel"
      data-testid={`matrix-level-${category.id}-${level.id}`}
    >
      <div>{objectivesNode}</div>
      {editing ? (
        <DnDItem
          data-testid={`matrix-level-${category.id}-${level.id}-testing-this-thing`}
          target={{
            categoryId: category.id,
            skillLevelId: level.id,
          }}
          isDragging={isDragging}
          mover={asyncEditObjective}
          drag={drag}
          dragPreview={dragPreview}
        >
          <CreateObjectiveForm levelId={level.id} category={category} courseId={courseId} newOrder={newOrder} />
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
