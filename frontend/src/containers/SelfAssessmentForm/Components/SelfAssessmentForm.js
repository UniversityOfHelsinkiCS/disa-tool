import React from 'react'
import ObjectiveQuestionModule from './QuestionModules/ObjectiveQuestionModule'
import CategoryQuestionModule from './QuestionModules/CategoryQuestionModule'
import OpenQuestionModule from './QuestionModules/OpenQuestionModule'
import SelfAssessmentInfo from './Sections/SelfAssessmentInfo'
import './selfAssesment.css'
import SelfAssessmentSection from './Sections/SelfAssessmentSection'
import EditCategoryModule from './QuestionModules/EditCategoryModule'
import EditObjectiveModule from './QuestionModules/EditObjectiveModule'

const SelfAssessmentForm = (props) => {
  const { edit, formData, responseErrors, preview, grades, existingAnswer } = props
  const { finalGradeResponse, openQuestionResponses, questionModuleResponses } = existingAnswer
  const { structure } = formData
  const editMode = edit && !preview
  let questionModule = null
  if (editMode) {
    if (structure.type === 'category') {
      questionModule = EditCategoryModule
    } else {
      questionModule = EditObjectiveModule
    }
  } else if (structure.type === 'category') {
    questionModule = CategoryQuestionModule
  } else {
    questionModule = ObjectiveQuestionModule
  }
  const finalGradeModule = editMode ? EditCategoryModule : CategoryQuestionModule
  const dummyPropToEnsureChange = () => null
  return (
    <div>
      <SelfAssessmentInfo formData={formData} edit={editMode} />
      <SelfAssessmentSection
        infoBoxTranslationId={editMode ? 'SelfAssessmentQuestionsEdit' : null}
        name={structure.questionModuleName}
        formData={structure.questionModules}
        edit={edit ? !preview : false}
        changedProp={dummyPropToEnsureChange}
        QuestionModule={questionModule}
        courseInstanceId={formData.course_instance_id}
        errors={responseErrors.qModErrors}
        grades={grades}
        existingAnswer={questionModuleResponses}
      />

      {structure.openQuestions.questions.length > 0 || editMode ? (
        <SelfAssessmentSection
          infoBoxTranslationId={editMode ? 'SelfAssessmentOpenQuestionsEdit' : null}
          name={structure.openQuestions.name}
          formData={structure.openQuestions.questions}
          edit={edit ? !preview : false}
          changedProp={dummyPropToEnsureChange}
          QuestionModule={OpenQuestionModule}
          question
          errors={responseErrors.openQErrors}
          existingAnswer={openQuestionResponses}
        />
      ) : null}

      {structure.finalGrade.includedInAssesment || editMode ? (
        <SelfAssessmentSection
          infoBoxTranslationId={editMode ? 'SelfAssessmentFinalGradeEdit' : null}
          headers={structure.headers.grade}
          headerType="grade"
          formData={[structure.finalGrade]}
          edit={edit ? !preview : false}
          QuestionModule={finalGradeModule}
          final
          courseInstanceId={formData.course_instance_id}
          changedProp={dummyPropToEnsureChange}
          errors={responseErrors.finalGErrors}
          grades={grades}
          existingAnswer={finalGradeResponse}
        />
      ) : null}
    </div>
  )
}
/*
SelfAssessmentForm.defaultProps = {
  responseErrors: {
    qModErrors:
      { grade: [], responseText: [] },
    finalGErrors:
      { grade: [], responseText: [] },
    openQErrors:
      { grade: [], responseText: [] }
  },
  existingAnswer: {}
}
*/
/*
SelfAssessmentForm.propTypes = {
  edit: PropTypes.bool.isRequired,
  formData: PropTypes.shape().isRequired,
  responseErrors: PropTypes.shape({
    openQErrors: PropTypes.shape(),
    qModErrors: PropTypes.shape(),
    finalGErrors: PropTypes.shape()
  }),
  preview: PropTypes.bool.isRequired,
  grades: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  existingAnswer: PropTypes.shape()
}
*/
export default SelfAssessmentForm
