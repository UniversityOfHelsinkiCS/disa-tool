import React from 'react'
import { Table } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { objectiveGrades } from '../../SelfAssessmentForm/utils'
import MathJaxText from '../../../utils/components/MathJaxText'

export const ObjectivesFeedback = ({ teacher = false, objectives = {} }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'feedbackPage.objectivesFeedback' })

  const deepCalculations = (data) => {
    let assesmentGrade = null
    // Fix might need fixes from "parseInt(data[toka].grade, 0)"
    assesmentGrade = Object.keys(data).reduce((eka, toka) => eka + parseInt(data[toka].grade, 10), 0)
    assesmentGrade = Math.round(assesmentGrade / Object.keys(data).length)
    if (!Number.isInteger(assesmentGrade)) {
      return 'Kaikkia ei ole arvioitu'
    }
    if (assesmentGrade > 0) {
      if (assesmentGrade > 1) {
        const wut = t('objectiveAssessment.good')
        return wut
      }
      const wut = t('objectiveAssessment.decent')
      return wut
    }
    const wut = t('objectiveAssessment.poor')
    return wut
  }

  const grades = objectiveGrades()

  return (
    <div>
      {teacher ? null : <h2>{t('message')}</h2>}
      {Object.keys(objectives).map((objective) => (
        <div key={objective}>
          <p>{objective.id}</p>
          <Table fixed compact celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">{objective}</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell colSpan="2">{deepCalculations(objectives[objective])}</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell colSpan="2" />
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>{t('objective')}</Table.HeaderCell>
                <Table.HeaderCell>{t('assessment')}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {objectives[objective].map((singleO) => (
                <Table.Row key={singleO.id}>
                  <Table.Cell>
                    <MathJaxText content={singleO.name} />
                  </Table.Cell>
                  <Table.Cell>{singleO.grade ? grades[singleO.grade] : 'IMPOSSBRU'}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ))}
    </div>
  )
}

/*
ObjectivesFeedback.propTypes = {
  teacher: PropTypes.bool,
  objectives: PropTypes.shape(),
  translate: PropTypes.func.isRequired,
}
*/
export default ObjectivesFeedback
