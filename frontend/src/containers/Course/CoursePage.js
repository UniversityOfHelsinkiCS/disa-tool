import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter, useParams,useLocation } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import asyncAction from '../../utils/asyncAction'
import { getCourseData, resetCourse } from './actions/course'
import EditMatrixTab from './components/matrix/EditMatrixTab'
import EditTypesTab from './components/types/EditTypesTab'
import EditTasksTab from './components/tasks/EditTasksTab'
import EditGradesTab from './components/grades/EditGradesTab'
import Navbar from './components/navbar/Navbar'
import CourseHeader from './components/header/CourseHeader'

export const  CoursePage = (props) => {
  const {id,url} = useParams()
  let location = useLocation()

  console.log(id,url)


  useEffect(() => {
    props.getCourseData({
      id: id
    })
    return(() => props.resetCourse())
  },[])


    if (props.loading) {
      return <Loader active />
    }
    return (
      <div className="CoursePage">
        <CourseHeader />
        <Navbar matchUrl={url} pathname={location.pathname} />
        <Switch>
          <Route path={`${url}/matrix`} render={() => <EditMatrixTab courseId={id} />} />
          <Route path={`${url}/types`} render={() => <EditTypesTab courseId={id} />} />
          <Route path={`${url}/tasks`} render={() => <EditTasksTab courseId={id} />} />
          <Route path={`${url}/grades`} render={() => <EditGradesTab courseId={id} />} />
          <Route component={() => <Redirect to={`${url}/matrix`} />} />
        </Switch>
      </div>
    )
  }

CoursePage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  getCourseData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  resetCourse: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  match: {
    ...ownProps.match,
    params: {
      ...ownProps.match.params,
      id: Number(ownid)
    }
  },
  location: ownProps.location,
  loading: state.course.loading
})

const mapDispatchToProps = dispatch => ({
  getCourseData: asyncAction(getCourseData, dispatch),
  resetCourse: resetCourse(dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)((
  DragDropContext(HTML5Backend)(CoursePage)
)))
