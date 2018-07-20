import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button } from 'semantic-ui-react'

import TaskObjectivelist from './TaskObjectivelist'
import RemoveTaskForm from './RemoveTaskForm'
import TaskTypelist from './TaskTypelist'

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  toggleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  renderExpanded() {
    if (!this.state.expanded) {
      return <div />
    }
    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <h4>{this.props.task.description}</h4>
            <p>{this.props.task.info}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <TaskTypelist
              types={this.props.task.types}
              task={this.props.task}
              editing={this.props.editing}
            />
          </Grid.Column>
        </Grid.Row>
        <TaskObjectivelist task={this.props.task} editing={this.props.editing} />
      </Grid>
    )
  }

  render() {
    return (
      <div className="Task">
        <div className="taskUncollapseable">
          <Button
            onClick={this.toggleExpanded}
            basic={!this.state.expanded}
            fluid
          >
            {this.props.task.name}
          </Button>
          {this.props.editing ? (
            <RemoveTaskForm task={this.props.task} />
          ) : (
            <div />
          )}
        </div>
        {this.renderExpanded()}
      </div>
    )
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    objectives: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number
    })).isRequired,
    types: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  editing: PropTypes.bool.isRequired
}

export default Task