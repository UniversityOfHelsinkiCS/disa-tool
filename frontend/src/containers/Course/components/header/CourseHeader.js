import React from 'react'
import { number, shape, string, bool, func } from 'prop-types'
import { withLocalize } from 'react-localize-redux'
import { Link } from 'react-router-dom'
import { Button, Segment, Header } from 'semantic-ui-react'
import './header.css'

export const CourseHeader = (props) => {
  const translate = id => props.translate(`Course.header.CourseHeader.${id}`)
  const {course} = props

  return (
    <div className="CourseHeader" id="course-header-container">
      <Segment>
        <Header as="h1" textAlign="center" id="course-header">
          {props.renderReturnLink ? (<Button
            as={Link}
            to={`/user/course/${course.id}`}
            basic
            color="blue"
            floated="left"
            icon="backward"
            content={translate('back_button')}
          />) : null}
          {course.name}
        </Header>
      </Segment>
    </div>
  )
}
/*
CourseHeader.propTypes = {
  course: shape({
    id: number.isRequired,
    name: string.isRequired
  }).isRequired,
  renderReturnLink: bool,
  translate: func.isRequired
}
*/
export default withLocalize(CourseHeader)
