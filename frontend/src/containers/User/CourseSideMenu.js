import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Menu } from 'semantic-ui-react'
import { orderBy } from 'lodash'
import { useTranslation } from 'react-i18next'

const renderCourseMenuItem = (course, activeCourse, handleChange) => {
  return (
    <Menu.Item
      key={course.id}
      as={Link}
      to={`/user/course/${course.id}`}
      name={course.name}
      color={course.active ? 'blue' : 'grey'}
      course={course}
      active={activeCourse.id && activeCourse.id === course.id}
      onClick={handleChange}
    >
      {course.name}
    </Menu.Item>
  )
}

const CourseSideMenu = ({ courses, activeCourse, handleChange }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'userPage.courseSideMenu' })
  const coursesSorted = orderBy(courses, 'name')
  const activeCourses = coursesSorted.filter((course) => course.active)
  const closedCourses = coursesSorted.filter((course) => !course.active)
  return (
    <Menu name="course-side-menu" fluid vertical tabular>
      <Menu.Item>
        <Header as="h4" color="green">
          {t('active_courses')}
        </Header>
      </Menu.Item>
      {activeCourses.map((course) => renderCourseMenuItem(course, activeCourse, handleChange))}
      <Menu.Item>
        <Header as="h4" color="red">
          {t('closed_courses')}
        </Header>
      </Menu.Item>
      {closedCourses.map((course) => renderCourseMenuItem(course, activeCourse, handleChange))}
    </Menu>
  )
}
/*
CourseSideMenu.propTypes = {
  courses: arrayOf(shape()).isRequired,
  activeCourse: shape().isRequired,
  handleChange: func.isRequired,
  translate: func.isRequired
}
*/
export default CourseSideMenu
