import React from 'react'
import { connect, useSelector } from 'react-redux'

import './types.css'
import TypeHeader from './TypeHeader'
import CreateHeaderForm from './CreateHeaderForm'

export const Headerlist = ({ courseId, editing }) => {
  const headers = useSelector((state) => state.type.headers)
  const activeTask = useSelector((state) =>
    state.task.active === null ? null : state.task.tasks.find((task) => task.id === state.task.active),
  )
  const sortedHeaders = headers.sort((a, b) => a.order - b.order)
  let newOrder = 1
  const headersNode = sortedHeaders.map((header, index, headersArray) => {
    const slots = {
      previous: index > 0 ? (header.order + headersArray[index - 1].order) / 2 : header.order - 1,
      next: index < headersArray.length - 1 ? (header.order + headersArray[index + 1].order) / 2 : header.order + 1,
    }
    if (index === headersArray.length - 1) {
      newOrder = slots.next
    }
    return (
      <TypeHeader
        key={header.order}
        header={header}
        editing={editing}
        courseId={courseId}
        activeTask={activeTask}
        slots={slots}
      />
    )
  })
  return (
    <div className="Headerlist" data-testid="header-list">
      {headersNode}
      {editing ? <CreateHeaderForm courseId={courseId} newOrder={newOrder} /> : null}
    </div>
  )
}
/*
Headerlist.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ).isRequired,
  editing: PropTypes.bool.isRequired,
  courseId: PropTypes.number.isRequired,
  activeTask: PropTypes.shape({
    id: PropTypes.number.isRequired,
    types: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
}
*/
export default connect()(Headerlist)
