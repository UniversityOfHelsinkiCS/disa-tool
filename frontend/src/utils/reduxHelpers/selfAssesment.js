export const initForm = (payload) => {
  const { courseData, type, courseInfo } = payload
  const data = {}
  data.course_instance_id = courseInfo.id
  const formInfo = []

  formInfo.push(
    { id: 1, prefix: 'Eng', value: 'English Display', type: 'eng_name' },
    { id: 3, prefix: 'Swe', value: 'Swedish Display', type: 'swe_name' },
    { id: 2, prefix: 'Fin', value: 'Finnish display', type: 'fin_name' },
  )
  formInfo.push(
    { id: 4, prefix: 'Eng', value: 'Instructions', type: 'eng_instructions' },
    { id: 5, prefix: 'Swe', value: 'anvisning', type: 'swe_instructions' },
    { id: 6, prefix: 'Fin', value: 'Ohjeita', type: 'fin_instructions' }
  )

  data.open = false
  data.active = false

  data.show_feedback = false
  data.type = type
  data.structure = {}
  const { structure } = data

  if (!structure.displayCoursename) {
    structure.displayCoursename = courseInfo[`${localStorage.getItem('lang')}_name`]
  }
  structure.formInfo = formInfo
  structure.openQuestions = {}
  structure.openQuestions.questions = []
  const id = (parseInt(courseData.reduce((c, d) => (c.id > d.id ? c : d)).id, 10) + 1)
  structure.openQuestions.incrementId = id + 1

  const headers = []

  headers.push(
    { id: 1, prefix: 'Fin:', value: 'Anna itsellesi loppuarvosana kurssista', type: 'fin_name' },
    { id: 2, prefix: 'Eng:', value: 'Give yourself a final grade for the course', type: 'eng_name' },
    { id: 3, prefix: 'Swe:', value: 'Låta en final grad till själv', type: 'swe_name' }
  )

  structure.finalGrade = {
    headers,
    textFieldOn: true,
    includedInAssesment: true,
    id
  }

  structure.headers = {}

  if (data.type === 'category') {
    structure.headers.questionHeaders = [
      { id: 1, prefix: 'Fin:', value: 'Kategoriaosio', type: 'fin_name' },
      { id: 2, prefix: 'Eng:', value: 'Categoryquestions', type: 'eng_name' },
      { id: 3, prefix: 'Swe:', value: 'Den här kategoria', type: 'swe_name' }
    ]
    structure.type = 'category'
    structure.questionModules = []
    courseData.map(ciO =>
      structure.questionModules.push({
        id: ciO.id,
        name: ciO.name,
        textFieldOn: true,
        includedInAssesment: true
      }))
  } else {
    structure.questionModules = []
    structure.type = 'objectives'
    structure.headers.questionHeaders = [
      { id: 1, prefix: 'Fin:', value: 'Tavoiteosio', type: 'fin_name' },
      { id: 2, prefix: 'Eng:', value: 'Objectivequestions', type: 'eng_name' },
      { id: 3, prefix: 'Swe:', value: 'Den här objektiver', type: 'swe_name' }
    ]
    courseData.map(ciO =>
      structure.questionModules.push({
        id: ciO.id,
        name: ciO.name,
        objectives: ciO.objectives.map(o => ({
          id: o.id,
          name: o.name,
          includedInAssesment: true
        })),
        includedInAssesment: true,
        options: ['osaan huonosti', 'osaan keskinkertaisesti', 'osaan hyvin']
      }))
  }
  data.structure.headers.openQ = [
    { id: 3, prefix: 'Fin:', value: 'Avoimet kysymykset', type: 'fin_name' },
    { id: 4, prefix: 'Eng:', value: 'Open questions', type: 'eng_name' },
    { id: 5, prefix: 'Swe:', value: 'Öppnä jotain', type: 'swe_name' }

  ]

  data.structure.headers.grade = [
    { id: 6, prefix: 'Fin:', value: 'Loppuarvio', type: 'fin_name' },
    { id: 7, prefix: 'Eng:', value: 'Final grade', type: 'eng_name' },
    { id: 8, prefix: 'Swe:', value: 'Final grääd', type: 'swe_name' }
  ]
  return data
}


export const initResponseForm = (data) => {
  const { questionModules, finalGrade, type } = data.structure
  const { questions } = data.structure.openQuestions
  const response = {}
  response.assessmentId = data.id
  response.course_instance_id = data.course_instance_id
  response.questionModuleResponses = []
  response.openQuestionResponses = []
  response.assessmentType = type

  if (type !== 'objectives') {
    questionModules.map(qm =>
      (qm.includedInAssesment ?
        response.questionModuleResponses.push({
          id: qm.id,
          responseText: '',
          textFieldOn: qm.textFieldOn,
          grade: null,
          name: qm.name
        }) : null))
  } else {
    questionModules.map(qm =>
      (qm.includedInAssesment ?
        qm.objectives.map(qmO =>
          (qmO.includedInAssesment ?
            response.questionModuleResponses.push({
              id: qmO.id,
              grade: null,
              name: qmO.name,
              header: qm.name,
              category: qm.id
            }) : null))
        :
        null))
  }

  questions.map(q =>
    response.openQuestionResponses.push({
      id: q.id,
      responseText: '',
      name: q.name
    }))

  response.finalGradeResponse = {}

  if (finalGrade.includedInAssesment) {
    response.finalGradeResponse.responseText = ''
    response.finalGradeResponse.grade = null
    response.finalGradeResponse.headers = finalGrade.headers
  }

  return response
}

export const respond = (state, payload, typeOfResponse) => {
  const { id, value, final } = payload

  if (!final) {
    return {
      ...state,
      assesmentResponse: {
        ...state.assesmentResponse,
        questionModuleResponses: state.assesmentResponse.questionModuleResponses.map(qmRes =>
          (qmRes.id === id ? { ...qmRes, [typeOfResponse]: value } : qmRes))
      }
    }
  }
  return {
    ...state,
    assesmentResponse: {
      ...state.assesmentResponse,
      finalGradeResponse: {
        ...state.assesmentResponse.finalGradeResponse, [typeOfResponse]: value
      }
    }
  }
}
