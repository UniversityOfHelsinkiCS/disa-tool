import React, { useRef } from 'react'
import { func, bool, node, PropTypes, number, shape } from 'prop-types'
import { useDrop, useDrag } from 'react-dnd'

const dummyFunc = (component) => component

const DnDItem = ({ element, type, children, slots, mover }) => {
    const ref = useRef(null)

    const [{ isDragging }, drag] = useDrag({
        type,
        item: () => {
            element.id, element.order
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const [{ handlerId }, drop] = useDrop({
        accept: 'objective',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(dragItem, monitor) {
            if (!ref.current) return false
            const { element, slots } = props
            let slot
            if (
                element.category_id !== drag.category_id ||
                element.skill_level_id !== drag.skill_level_id
            ) {
                slot = slots ? slots.previous : element.order
            } else if (drag.order === element.order) {
                slot = drag.order
            } else if (drag.order > element.order) {
                slot = slots.previous
            } else {
                slot = slots.next
            }
            mover(
                {
                    id: drag.id,
                    order: slot,
                },
                true
            )
        },
    })
    drag(drop(ref))
    return (
        <div
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            data-handler-id={handlerId}
        >
            {children}
        </div>
    )
}

DnDItem.propTypes = {
    connectDropTarget: func,
    connectDragSource: func,
    isDragging: bool,
    children: node,
    element: shape({
        id: number.isRequired,
        order: number.isRequired,
    }),
    type: PropTypes.string.isRequired,
    slot: number.isRequired,
    slots: shape(),
    mover: func.isRequired,
}

DnDItem.defaultProps = {
    connectDropTarget: dummyFunc,
    connectDragSource: dummyFunc,
    isDragging: false,
}

const dropCollect = (conn) => ({
    connectDropTarget: conn.dropTarget(),
})

const dragSpec = {
    beginDrag: (props) => ({
        id: props.element.id,
        order: props.element.order,
    }),
}

const dragCollect = (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    isDragging: monitor.isDragging(),
})

const dropSpec = {
    drop: (props, monitor) => {
        const drag = monitor.getItem()
        const { element } = props
        let slot
        if (drag.order === element.order) {
            slot = drag.order
        } else if (drag.order > element.order) {
            slot = props.slots.previous
        } else {
            slot = props.slots.next
        }
        props.mover(
            {
                id: drag.id,
                order: slot,
            },
            true
        )
    },
}

export const defaults = {
    dropSpec,
    dropCollect,
    dragSpec,
    dragCollect,
}

export default DnDItem
