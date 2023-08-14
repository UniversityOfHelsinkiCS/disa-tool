import React, { useEffect,useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Route, Switch, Redirect, withRouter, useParams ,useRouteMatch} from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { getCourseData, resetCourse } from './actions/course'
import EditMatrixTab from './components/matrix/EditMatrixTab'
import EditTypesTab from './components/types/EditTypesTab'
import EditTasksTab from './components/tasks/EditTasksTab'
import EditGradesTab from './components/grades/EditGradesTab'
import Navbar from './components/navbar/Navbar'
import CourseHeader from './components/header/CourseHeader'

export const  CoursePage = () => {
  const {id} = useParams()
  const {loading} = useSelector(state => state.course)
  const matches = useRouteMatch()
  const dispatch = useDispatch()
  const url = matches.url
  useEffect(() => {
    const asyncFunction = async () => {
    const courseData = await getCourseData({id: id})
    dispatch(courseData)

    }
asyncFunction()
    return(() => resetCourse(dispatch))
  },[])
    if (loading) {
      return <Loader active id="loadin-icon" />
    }
    return (
      <div className="CoursePage" data-testid="course-page">
        <CourseHeader/>
        <Navbar matchUrl={url} pathname={location.pathname} />
        <Switch>
          <Route path={`${url}/matrix`} render={() => <EditMatrixTab courseId={Number(id)} />} />
          <Route path={`${url}/types`} render={() => <EditTypesTab courseId={Number(id)} />} />
          <Route path={`${url}/tasks`} render={() => <EditTasksTab courseId={Number(id)} />} />
          <Route path={`${url}/grades`} render={() => <EditGradesTab courseId={Number(id)} />} />
          <Route component={() => <Redirect to={`${url}/matrix`} />} />
        </Switch>
      </div>
    )
  }

CoursePage.propTypes = {
 /* match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,*/
 // getCourseData: PropTypes.func.isRequired,
//  loading: PropTypes.bool.isRequired,
 // resetCourse: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({

 // loading: state.course.loading
})

export default withRouter((
  DragDropContext(HTML5Backend)(CoursePage)
))
