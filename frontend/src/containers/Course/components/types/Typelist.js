import React from 'react'
import { connect, useDispatch } from 'react-redux'

import { useDrag } from 'react-dnd'
import Type from './Type'
import CreateTypeForm from './CreateTypeForm'
import { editType } from '../../actions/types'
import asyncAction from '../../../../utils/asyncAction'
import DnDItem from '../../../../utils/components/DnDItem'

export const Typelist = ({ activeTaskId, headerId, editing, activeMap, types }) => {
  const dispatch = useDispatch()
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'type',
      item: { type: 'type', typeHeaderId: headerId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [],
  )

  const asyncMoveTypeList = async (props) => {
    asyncAction(editType(props), dispatch)
  }
  const sortedTypes = types.sort((a, b) => a.order - b.order)
  let newOrder = 1
  const typesNode = sortedTypes.map((type, index, typesArray) => {
    const slots = {
      previous: index > 0 ? (type.order + typesArray[index - 1].order) / 2 : type.order - 1,
      next: index < typesArray.length - 1 ? (type.order + typesArray[index + 1].order) / 2 : type.order + 1,
    }
    if (index === typesArray.length - 1) {
      newOrder = slots.next
    }
    return (
      <Type
        key={type.order}
        type={type}
        editing={editing}
        active={Boolean(activeMap[type.id])}
        activeTaskId={activeTaskId}
        headerId={headerId}
        slots={slots}
      />
    )
  })
  return (
    <div className="Typelist" data-testid={`type-list-${headerId}`}>
      {typesNode}
      {editing ? (
        <DnDItem
          target={{ order: newOrder, typeHeaderId: headerId }}
          mover={asyncMoveTypeList}
          drag={drag}
          isDragging={isDragging}
          dragPreview={dragPreview}
        >
          <CreateTypeForm headerId={headerId} newOrder={newOrder} />
        </DnDItem>
      ) : null}
    </div>
  )
}
/*
Typelist.propTypes = {
  types: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ).isRequired,
  editing: PropTypes.bool.isRequired,
  headerId: PropTypes.number.isRequired,
  activeTaskId: PropTypes.number,
  activeMap: PropTypes.objectOf(PropTypes.bool).isRequired,
  moveType: PropTypes.func.isRequired,
}
*/

export default connect()(Typelist)
