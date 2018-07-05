import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button } from 'semantic-ui-react'
import './tasks.css'

import ObjectiveSlider from './ObjectiveSlider'
import AddObjectiveForm from './AddObjectiveForm'

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
            <h3>{this.props.task.name}</h3>
            <h4>{this.props.task.description}</h4>
            <p>{this.props.task.info}</p>
          </Grid.Column>
        </Grid.Row>
        {this.props.task.objectives.map(objective => (
          <ObjectiveSlider key={objective.id} objective={objective} taskId={this.props.task.id} />
        ))}
        {this.props.editing ? (
          <AddObjectiveForm
            objectiveIds={this.props.task.objectives.map(objective => objective.id)}
            taskId={this.props.task.id}
          />
        ) : (
          <div />
        )}
      </Grid>
    )
  }

  render() {
    return (
      <div className="task">
        <Button
          onClick={this.toggleExpanded}
          basic={!this.state.expanded}
          fluid
        >
          {this.props.task.name}
        </Button>
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
    })).isRequired
  }).isRequired,
  editing: PropTypes.bool
}

Task.defaultProps = {
  editing: false
}

export default Task