import React, { Fragment } from 'react'
import { Card } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'

export const QuestionAndGradeFeedback = ({
  openQuestionResponses = [],
  finalGradeResponse = {},
  overallVerification = null,
  teacher = false,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'feedbackPage.questionAndGradeFeedback' })

  return (
    <div style={{ marginTop: '50px' }}>
      {openQuestionResponses.length > 0 ? <h2>{t('header')}</h2> : null}
      {openQuestionResponses.map((openQ) => (
        <Card key={openQ.id} fluid color="red">
          <Card.Content>
            <Card.Header textAlign="center">
              <h3>{openQ.name}</h3>
            </Card.Header>
            <Card.Description textAlign="center">
              <div>
                <h5>{t('response')}:</h5>
                <p>{openQ.responseText}</p>
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      ))}

      {Object.keys(finalGradeResponse).length > 1 ? (
        <div>
          <h2>{t('selfAssessedGrade')}</h2>
          <Card key={finalGradeResponse.name} fluid color="red">
            <Card.Content>
              <Card.Header textAlign="center">
                <h3>{finalGradeResponse.name}</h3>
              </Card.Header>
              <Card.Description textAlign="center">
                <h4>
                  {t('selfAssessedGrade')}: {finalGradeResponse.grade_name || finalGradeResponse.grade}
                  {teacher && overallVerification && (
                    <>
                      <br />
                      {t('machineGrade')}: {overallVerification.minGrade} - {overallVerification.maxGrade}
                    </>
                  )}
                </h4>
                {finalGradeResponse.responseText.length > 0 ? (
                  <div>
                    <h5>{t('explanation')}:</h5>
                    <p>{finalGradeResponse.responseText}</p>
                  </div>
                ) : null}
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      ) : null}
    </div>
  )
}

/*
QuestionAndGradeFeedback.propTypes = {
  openQuestionResponses: PropTypes.arrayOf(PropTypes.shape()),
  finalGradeResponse: PropTypes.shape(),
  translate: PropTypes.func.isRequired,
  overallVerification: PropTypes.shape({}),
  teacher: PropTypes.bool,
}
*/
export default QuestionAndGradeFeedback
