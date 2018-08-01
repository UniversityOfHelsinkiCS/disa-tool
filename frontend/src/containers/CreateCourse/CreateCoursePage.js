import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Button, Segment, Header } from 'semantic-ui-react'
import asyncAction from '../../utils/asyncAction'
import './createCourse.css'

import { createCourse } from './services/createCourse'

import MultilingualField from '../../utils/components/MultilingualField'

class CreateCoursePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null
    }
  }

  createCourseSubmit = (e) => {
    e.preventDefault()
    this.props.createCourse({
      eng_name: e.target.eng_name.value,
      fin_name: e.target.fin_name.value,
      swe_name: e.target.swe_name.value
    }).then(action => this.setState({ redirect: action.response.created }))
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/courses?id=${this.state.redirect.id}`} />
    }
    const label = {
      name: 'nimi'
    }
    return (
      <div className="CreateCoursePage">
        <Segment className="formContainer" basic padded>
          <Header>Luo uusi kurssi</Header>
          <Form onSubmit={this.createCourseSubmit}>
            <MultilingualField field="name" fieldDisplay={label.name} />
            <Button type="submit" color="green">Luo</Button>
          </Form>
        </Segment>
      </div>
    )
  }
}

CreateCoursePage.propTypes = {
  createCourse: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  createCourse: asyncAction(createCourse, dispatch)
})

export default connect(null, mapDispatchToProps)(CreateCoursePage)
