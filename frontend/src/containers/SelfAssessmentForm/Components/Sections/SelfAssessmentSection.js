import React from 'react'
import { Card } from 'semantic-ui-react'
import AddOpenQuestion from '../addOpenQuestion'
import Header from '../Header'
import InfoBox from '../../../../utils/components/InfoBox'

const SelfAssessmentSection = (props) => {
  const {
    final,
    question,
    edit,
    QuestionModule,
    formData,
    errors,
    clearError,
    courseInstanceId,
    grades,
    name,
    headers,
    existingAnswer,
    infoBoxTranslationId,
  } = props
  const { responseText, grade } = errors
  const questions = edit
    ? formData.map((questionModules) => (
        <li key={questionModules.id} style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
          <QuestionModule data={questionModules} edit={edit} final={final} />
        </li>
      ))
    : formData.map(
        (questionModules) =>
          (questionModules.includedInAssesment || question) && (
            <li key={questionModules.id} style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              <QuestionModule
                data={questionModules}
                edit={edit}
                final={final}
                existingAnswer={existingAnswer}
                courseInstanceId={courseInstanceId}
                gradeError={final ? grade[0] : grade.find((e) => e.id === questionModules.id)}
                responseTextError={final ? responseText[0] : responseText.find((e) => e.id === questionModules.id)}
                clearError={clearError}
                grades={grades}
              />
            </li>
          )
      )

  return (
    <div>
      <Card fluid color="red" className="formCard" data-testid="self-assessment-section">
        <Card.Content>
          {infoBoxTranslationId && <InfoBox translationid={infoBoxTranslationId} buttonProps={{ floated: 'right' }} />}
          <Header
            editButton={final}
            name={final ? formData[0].header : name}
            edit={edit}
            headerType={props.headerType}
            headers={headers}
            style={final ? { color: formData[0].includedInAssesment ? 'black' : 'grey' } : null}
          />
          <ul data-testid={`self-assessment-section-list-${name}`}>{questions}</ul>
          {question && edit && <AddOpenQuestion />}
        </Card.Content>
      </Card>
    </div>
  )
}
/*
SelfAssessmentSection.propTypes = {
  formData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    includedInAssesment: PropTypes.bool
  })).isRequired,
  edit: PropTypes.bool.isRequired,
  question: PropTypes.bool,
  QuestionModule: PropTypes.func.isRequired,
  final: PropTypes.bool,
  headerType: PropTypes.string,
  clearError: PropTypes.func,
  errors: PropTypes.shape({
    responseText: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired
    }))
  }).isRequired,
  courseInstanceId: PropTypes.number,
  grades: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.shape()),
  infoBoxTranslationId: PropTypes.string
}
*/
export default SelfAssessmentSection
