import React from 'react'
import SelfAssesmentForm from '../Userform/SelfAssesmentForm'
import asyncAction from '../../../utils/asyncAction'
import { connect } from 'react-redux'
import {
  Form,
  Button
} from 'semantic-ui-react'

import { getSelfAssesmentData } from '../services/createForm'
import { createFormJSONStucture } from '../reducers/createFormReducer'

export class SelfAssesmentCreateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { active: [], selectedView: '', createdForm: {} }
  }

  componentWillMount() {
    this.props.getSelfAssesmentData()
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    let { active } = this.state
    const opened = active.includes(index)
      ? (active = active.filter(i => i !== index))
      : active.concat(index)
    this.setState({ active: opened })
  }

  toggleButton = (e) => {
    const { value } = e.target
    this.setState({ selectedView: value })
  }

  createForm = () => {
    const data = {}
    const { courseInstance } = this.props.courseData
    data.fin_name = courseInstance.fin_name
    data.swe_name = courseInstance.fin_name
    data.eng_name = courseInstance.fin_name
    data.type = this.state.selectedView

    if (data.type === 'category') {
      data.questionModules = []
      courseInstance.course_instance_objectives.map(ciO =>
        data.questionModules.push({
          id: ciO.id,
          fin_name: ciO.category,
          swe_name: ciO.category,
          eng_name: ciO.category,
          textFieldOn: true
        }))
    } else {
      data.questionModules = []
      courseInstance.course_instance_objectives.map(ciO =>
        data.questionModules.push({
          id: ciO.id,
          fin_name: ciO.category,
          swe_name: ciO.category,
          eng_name: ciO.category,
          objectives: ciO.objectives.map(o => ({
            fin_name: o,
            swe_name: o,
            eng_name: o
          })),
          answers: ['osaan huonosti', 'osaan keskinkertaisesti', 'osaan hyvin']
        }))
    }
    this.props.createFormJSONStucture(data)
    this.setState({ created: true, createdForm: data })
  }

  renderCreateOrDraft = () => {
    const { selectedView, createdForm } = this.state
    const category = 'category'
    const objectives = 'objectives'

    if (!this.state.created) {
      return (
        <Form onSubmit={this.createForm}>
          <Form.Field>
            <Button
              type='button'
              value={category}
              active={category === selectedView}
              toggle
              onClick={this.toggleButton}
            >
              Itsearviolomake kategorioiden pohjalta
            </Button>
            <Button
              type='button'
              value={objectives}
              active={objectives === selectedView}
              toggle
              onClick={this.toggleButton}
            >
              Itsearviolomake tavoitteiden pohjalta
            </Button>
          </Form.Field>
          <Button style={{ marginLeft: '250px' }} type='submit'>
            Luo
          </Button>
        </Form>)
    }
    return <SelfAssesmentForm justCreated={true} createdForm={createdForm} />
  }

  render() {
    return <div>{this.renderCreateOrDraft()}</div>
  }
}

const mapStateToProps = (state) => {
  return {
    courseData: state.createForm.courseData,
    category: state.createForm.category,
    objectives: state.createForm.objectives
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSelfAssesmentData: asyncAction(getSelfAssesmentData, dispatch),
    createFormJSONStucture: createFormJSONStucture(dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelfAssesmentCreateForm)