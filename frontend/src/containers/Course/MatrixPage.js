import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Loader, Button, Container, Segment } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { getMatrix, resetCourse } from './actions/course'
import Matrix from './components/matrix/Matrix'
import CourseHeader from './components/header/CourseHeader'
import Conditional from '../../utils/components/Conditional'
import { getCourseInstanceDataAction } from '../../actions/actions'

const MatrixPage = (props) => {
  const isTeacher = useSelector((state) => state.instance.courseRole === 'TEACHER')
  const loading = useSelector((state) => state.course.loading)
  const levels = useSelector((state) => state.level.levels)
  const categories = useSelector((state) => state.category.categories)
  const tasks = useSelector((state) => state.instance.tasks)

  const { t } = useTranslation('translation', { keyPrefix: 'course.matrix.common' })

  const dispatch = useDispatch()
  const courseId = Number(useParams().id) || props.courseId

  const getMatrixAsync = async () => {
    const response = await getMatrix({
      id: courseId,
    })
    dispatch(response)
  }

  useEffect(() => {
    if (tasks.length === 0) {
      getCourseInstanceDataAction(courseId, dispatch)
    }
    if (levels.length === 0 && categories.length === 0) {
      getMatrixAsync()
    }

    return () => resetCourse(dispatch)
  }, [])

  if (loading) {
    return <Loader active />
  }
  return (
    <div className="MatrixPage">
      {props.hideHeader ? null : <CourseHeader renderReturnLink={false} />}
      <Conditional visible={isTeacher}>
        <Button as={Link} to={`/course/${courseId}/matrix`} fluid style={{ marginBottom: '10px' }}>
          {t('editMatrix')}
        </Button>
      </Conditional>
      <Container>
        <Segment style={{ overflowX: 'auto', padding: 0 }}>
          <div style={{ padding: '1em' }}>
            <Matrix courseId={courseId} editing={false} categoryId={props.categoryId} />
          </div>
        </Segment>
      </Container>
    </div>
  )
}

/*
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
*/

export default connect()(MatrixPage)
