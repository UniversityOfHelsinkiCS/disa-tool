import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { Container, Segment, Loader, Header } from 'semantic-ui-react'
import './grades.css'
import { useTranslation } from 'react-i18next'
import { getGrades } from '../../actions/grades'
import Gradelist from './Gradelist'
import CategoryGradeTable from './CategoryGradeTable'
import InfoBox from '../../../../utils/components/InfoBox'

const EditGradesTab = ({ courseId }) => {
  const grade = useSelector((state) => state.grade)
  const levels = useSelector((state) => state.level.levels)
  const categories = useSelector((state) => state.category.categories)
  const dispatch = useDispatch()
  const { t } = useTranslation('translation', { keyPrefix: 'course.grades.editGradesTab' })

  const asyncGetGrades = async () => {
    const response = await getGrades({
      id: courseId,
    })
    dispatch(response)
  }

  useEffect(() => {
    if (grade.loading) {
      asyncGetGrades()
    }
  }, [])

  if (grade.loading) return <Loader active />
  return (
    <div className="EditGradesTab">
      <Container>
        <Segment>
          <InfoBox translationid="EditGradesPage" buttonProps={{ floated: 'right' }} />
          <Header as="h1" content={t('header')} />
          <Gradelist grades={grade.grades} levels={levels} />
        </Segment>
        <CategoryGradeTable courseId={courseId} grades={grade.grades} levels={levels} categories={categories} />
      </Container>
    </div>
  )
}
/*
EditGradesTab.propTypes = {
  courseId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  getGrades: PropTypes.func.isRequired,
  grades: PropTypes.arrayOf(PropTypes.object).isRequired,
  levels: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  translate: PropTypes.func.isRequired
}
*/

export default connect()(EditGradesTab)
