import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { reactDndTypes } from '../utils'

const handleDrop = (props, drag) => {
  const { mover, slots, target } = props
  let slot
  if (drag.type === 'objective') {
    if (target.categoryId !== drag.category_id || target.skillLevelId !== drag.skill_level_id) {
      slot = slots ? slots.previous : target.order
    } else if (drag.order === target.order) {
      slot = drag.order
    } else if (drag.order > target.order) {
      if (slots) slot = slots.previous
    } else if (slots) slot = slots.next
    mover(
      {
        id: drag.id,
        order: slot,
        categoryId: target.categoryId,
        skillLevelId: target.skillLevelId,
      },
      true,
    )
  } else if (drag.type === 'type') {
    if (drag.typeHeaderId === target.typeHeaderId) {
      if (drag.order === target.order) {
        slot = drag.order
      } else if (drag.order > target.order) {
        slot = slots.previous
      } else {
        slot = slots.next
      }
    } else {
      slot = slots ? slots.previous : target.order
    }
    mover(
      {
        id: drag.id,
        order: slot,
      },
      true,
    )
  }
  return true
}

const DnDItem = ({ slots, mover, children, drag, isDragging, target, dragPreview, itemName }) => {
  const realRef = useRef(null)
  const previewRef = useRef(null)
  const [, drop] = useDrop(
    () => ({
      accept: reactDndTypes,
      drop: (draggingItem) => {
        if (!realRef.current) {
          return
        }
        handleDrop({ mover, slots, target }, draggingItem)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isDragging,
        draggingColor: monitor.getItemType(),
      }),
    }),
    [],
  )
  drag(drop(realRef))
  dragPreview(previewRef)

  return isDragging ? (
    <div ref={previewRef} />
  ) : (
    <div
      ref={realRef}
      id={itemName}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: 'move',
      }}
    >
      {children}
    </div>
  )
}

export default DnDItem
