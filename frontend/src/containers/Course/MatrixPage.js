import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loader, Button, Container, Segment } from 'semantic-ui-react'
import asyncAction from '../../utils/asyncAction'

import { getMatrix, resetCourse } from './actions/course'

import Matrix from './components/matrix/Matrix'
import CourseHeader from './components/header/CourseHeader'
import Conditional from '../../utils/components/Conditional'
import { getCourseInstanceDataAction } from '../../actions/actions'

const MatrixPage = (props) => {


  useEffect(() => {
    props.updateCourseInfo(props.courseId)
    props.getMatrix({
      id: props.courseId
    })
    return(() =>  props.resetCourse())
  },[])

    if (props.loading) {
      return (<Loader active />)
    }
    return (
      <div className="MatrixPage">
        {props.hideHeader ? null : <CourseHeader renderReturnLink={false} />}
        <Conditional visible={props.isTeacher}>
          <Button as={Link} to={`/course/${props.courseId}/matrix`} fluid style={{ marginBottom: '10px' }}>Edit matrix</Button>
        </Conditional>
        <Container>
          <Segment style={{ overflowX: 'auto', padding: 0 }}>
            <div style={{ padding: '1em' }}>
              <Matrix courseId={props.courseId} editing={false} categoryId={props.categoryId} />
            </div>
          </Segment>
        </Container>
      </div>
    )
  }


MatrixPage.defaultProps = {
  hideHeader: false,
  categoryId: null
}

MatrixPage.propTypes = {
  courseId: PropTypes.number.isRequired,
  getMatrix: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  resetCourse: PropTypes.func.isRequired,
  hideHeader: PropTypes.bool,
  categoryId: PropTypes.number,
  updateCourseInfo: PropTypes.func.isRequired,
  isTeacher: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  loading: state.course.loading,
  courseId: ownProps.match ? Number(ownProps.match.params.id) : ownProps.courseId,
  isTeacher: state.instance.courseRole === 'TEACHER'
})

const mapDispatchToProps = dispatch => ({
  getMatrix: asyncAction(getMatrix, dispatch),
  resetCourse: resetCourse(dispatch),
  updateCourseInfo: courseId => dispatch(getCourseInstanceDataAction(courseId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MatrixPage)
