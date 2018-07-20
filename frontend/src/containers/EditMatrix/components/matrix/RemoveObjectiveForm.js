import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import asyncAction from '../../../../utils/asyncAction'

import { removeObjective } from '../../services/objectives'

import ModalForm from '../../../../utils/components/ModalForm'

export class RemoveObjectiveForm extends Component {
  removeObjective = () => {
    this.props.removeObjective({
      id: this.props.objective.id,
      course_instance_id: this.props.courseId
    })
  }

  render() {
    const contentPrompt = [
      'Poistetaanko oppimistavoite',
      `"${this.props.objective.name}"`
    ].join(' ')
    return (
      <div className="RemoveObjectiveForm">
        <ModalForm
          header="Poista oppimistavoite"
          trigger={<Button color="red" icon={{ name: 'delete' }} size="small" />}
          content={
            <div>
              <p>{contentPrompt}?</p>
              <div className="choiceContainer">
                <Button color="red" onClick={this.removeObjective}>
                  Poista
                </Button>
                <Button>
                  Peru
                </Button>
              </div>
            </div>
          }
        />

      </div>
    )
  }
}

RemoveObjectiveForm.propTypes = {
  objective: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  removeObjective: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired
}

const mapDispatchToProps = dispatch => ({
  removeObjective: asyncAction(removeObjective, dispatch)
})

export default connect(null, mapDispatchToProps)(RemoveObjectiveForm)