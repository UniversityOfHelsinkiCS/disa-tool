import React, { useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { CSVLink } from 'react-csv'
import { useTranslation } from 'react-i18next'
import { objectiveGrades } from '../../SelfAssessmentForm/utils'

const replaceQuotesAndLineBreaks = (str) =>
  typeof str === 'string' ? str.replace(/["]/g, '""').replace(/(\r\n|\n|\r)/gm, ' ') : ''

const formatToCsv = (responses) => {
  const formatted = responses.map((response) => {
    const findCalculatedGrade = (question) => {
      const { verification } = response.response
      const category = verification
        ? verification.categoryVerifications.find((c) => c.categoryId === question.id)
        : { earnedGrade: { name: '' } }
      return category.earnedGrade.name
    }
    const questionResponses = response.response.questionModuleResponses.map((question) =>
      // If question modules are by category, then responseText will be populated.
      // This is a hacky way of sequestering the two possibilities.
      question.responseText
        ? {
            [`${question.name}_text`]: replaceQuotesAndLineBreaks(question.responseText),
            [`${question.name}_grade`]: question.grade_name,
            [`${question.name}_calculated_grade`]: findCalculatedGrade(question),
          }
        : {
            [question.name]: objectiveGrades()[question.grade],
          },
    )
    const openResponses = response.response.openQuestionResponses.map((question) => ({
      [`${question.name}_text`]: replaceQuotesAndLineBreaks(question.responseText),
    }))
    const { finalGradeResponse, verification } = response.response
    const finalResponse = finalGradeResponse.name
      ? {
          [`${finalGradeResponse.name}_text`]: replaceQuotesAndLineBreaks(finalGradeResponse.responseText),
          [`${finalGradeResponse.name}_grade`]: finalGradeResponse.grade_name,
          [`${finalGradeResponse.name}_min_grade`]: verification ? verification.overallVerification.minGrade : '',
          [`${finalGradeResponse.name}_max_grade`]: verification ? verification.overallVerification.maxGrade : '',
        }
      : {}
    const flattenedQuestions = questionResponses.reduce((acc, curr) => ({ ...acc, ...curr }), {})
    const flattenedOpens = openResponses.reduce((acc, curr) => ({ ...acc, ...curr }), {})
    return {
      studentnumber: response.person.studentnumber,
      name: response.person.name,
      ...flattenedQuestions,
      ...flattenedOpens,
      ...finalResponse,
    }
  })
  return formatted
}

const SelfAssesmentCSVDownload = () => {
  const [data, setData] = useState('')
  const filePrefix = useSelector((state) => state.selfAssesmentList.selfAssesmentName)
  const responses = useSelector((state) => state.selfAssesmentList.selectedResponses)
  const { t } = useTranslation('translation', { keyPrefix: 'selfAssessmentList.selfAssesmentCSVDownload' })

  const prepare = async () => {
    const formattedCsv = await formatToCsv(responses)
    setData(formatToCsv(formattedCsv))
  }

  return (
    <Button
      disabled={responses.length === 0}
      as={CSVLink}
      onClick={prepare}
      basic
      color="green"
      content={t('download_csv')}
      filename={`${filePrefix}_responses.csv`}
      data={data}
    />
  )
}
/*
SelfAssesmentCSVDownload.propTypes = {
  responses: arrayOf(responseProp).isRequired,
  filePrefix: string,
  translate: func.isRequired,
}
*/

export default connect()(SelfAssesmentCSVDownload)
