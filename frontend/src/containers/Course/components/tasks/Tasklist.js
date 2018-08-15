import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import './tasks.css'

import Task from './Task'
import AddTaskForm from './AddTaskForm'

export const Tasklist = props => (
  <Container>
    {props.tasks.map(task => (<Task
      key={task.id}
      task={task}
      editing
      openModal={props.openModal}
    />))}
    {props.editing ? (
      <AddTaskForm courseId={props.courseId} />
    ) : (
      null
    )}
  </Container>
)

Tasklist.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number
  })).isRequired,
  editing: PropTypes.bool.isRequired,
  courseId: PropTypes.number.isRequired,
  openModal: PropTypes.func
}

Tasklist.defaultProps = {
  openModal: () => {}
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  tasks: state.task.tasks
})

export default connect(mapStateToProps, null)(Tasklist)
