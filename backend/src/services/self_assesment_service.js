const {
  SelfAssessment,
  AssessmentResponse,
  CourseInstance,
  Person
} = require('../database/models.js')

const categoryService = require('../services/category_service')
const courseInstanceService = require('../services/course_instance_service')

const assessmentAttributes = lang => [
  'id',
  [`${lang}_name`, 'name'],
  [`${lang}_instructions`, 'instructions'],
  'structure',
  'open',
  'active',
  'show_feedback',
  'course_instance_id']

const addSelfAssesment = async (data, lang) => {
  const inputData = { ...data, id: undefined }
  const name = [`${lang}_name`, 'name']
  const instructions = [`${lang}_instructions`, 'instructions']
  const created = await SelfAssessment.create(inputData).then(createdSA => SelfAssessment.findByPk(createdSA.id, {
    attributes: ['id', name, instructions, 'structure', 'open', 'active', 'show_feedback', 'course_instance_id']
  }))
  return created
}

const getUserSelfAssesments = async (user, lang) => {
  const name = [`${lang}_name`, 'name']
  const instructions = [`${lang}_instructions`, 'instructions']


  const data = await SelfAssessment.findAll({
    attributes: ['id', name, instructions, 'structure', 'open', 'active', 'show_feedback', 'course_instance_id'],
    include: [
      {
        model: CourseInstance,
        required: true,
        attributes: ['id'],
        include: [
          {
            model: Person,
            required: true,
            through: {
              attributes: ['role']
            },
            attributes: ['id'],
            where: {
              id: user.id
            }
          }
        ]
      }
    ]
  })
  return data.filter(selfAssesment => (
    selfAssesment.active || selfAssesment.course_instance.people[0].course_person.role === 'TEACHER'
  ))
}

const updateSelfAssesment = async (data, lang) => {
  await SelfAssessment.update(
    {
      fin_name: data.fin_name,
      swe_name: data.swe_name,
      eng_name: data.eng_name,
      fin_instructions: data.fin_instructions,
      eng_instructions: data.eng_instructions,
      swe_instructions: data.swe_instructions,
      structure: data.structure,
      open: data.open,
      active: data.active,
      show_feedback: data.show_feedback
    },
    {
      where: { id: data.id }
    }
  )
  const updated = await SelfAssessment.findByPk(data.id, {
    attributes:
      assessmentAttributes(lang)
  })
  return updated
}

const getAssesmentsForCourse = (courseId, lang, userId) => (
  SelfAssessment.findAll({
    where: { course_instance_id: courseId },
    attributes: assessmentAttributes(lang),
    include: { model: AssessmentResponse, where: { personId: userId }, required: false }
  })
)

const getOne = async (selfAssesmentId, lang) => {
  const assesment = await SelfAssessment.findOne({
    where: { id: selfAssesmentId }
  })
  if (!assesment) { return null }
  const assesmentValues = assesment.get({ plain: true })
  return setAssessmentLanguage(assesmentValues, lang)
}

const toggleAssessment = {
  prepare: async (id, attribute) => {
    const instance = await SelfAssessment.findByPk(id)
    instance[attribute] = !instance[attribute]
    return instance
  },
  execute: async instance => instance.save()
}

const setAssessmentStatus = {
  prepare: async (id, attributes) => {
    const instance = await SelfAssessment.findByPk(id)
    attributes.forEach((a) => { instance[a.name] = !!a.value })
    return instance
  },
  execute: async instance => instance.save()
}

const isFeedbackActive = async (id) => {
  const assessment = await SelfAssessment.findByPk(id)
  return assessment.show_feedback
}

const getAssessmentType = id => (
  SelfAssessment.findByPk(id).then(res => res.structure.type)
)

const setAssessmentLanguage = async (selfAssessment, lang) => {
  const assessmentCopy = { ...selfAssessment }
  const { structure } = assessmentCopy
  const { course_instance_id } = assessmentCopy //eslint-disable-line
  const { type } = structure
  const name = `${lang}_name`
  const instructions = `${lang}_instructions`

  assessmentCopy.name = assessmentCopy[name]
  const oldInst = structure.formInfo.find(h => h.type === instructions)
  assessmentCopy.instructions = { header: oldInst.header, value: oldInst.value }

  structure.finalGrade.name = (structure.finalGrade.headers.find(h => h.type === name)).value
  structure.openQuestions.name = (structure.headers.openQ.find(h => h.type === name)).value
  structure.questionModuleName = (structure.headers.questionHeaders.find(h => h.type === name)).value
  structure.finalGrade = {
    ...structure.finalGrade,
    header: structure.headers.grade.find(h => h.type === name).value,
    value: structure.finalGrade.headers.find(h => h.type === name).value
  }

  const categories = (await categoryService.getCourseCategories(course_instance_id, lang)).map(category => category.get({ plain: true }))
  structure.displayCoursename = ((await courseInstanceService.getOne(course_instance_id)).get({ plain: true }))[name]
  const categoryNames = {}
  const objNames = {}

  categories.forEach(cat => (categoryNames[cat.id] = cat.name)) //eslint-disable-line
  categories.forEach(cat => cat.objectives.forEach(o => objNames[o.id] = o.name))  //eslint-disable-line
  structure.openQuestions.questions = structure.openQuestions.questions.map(openQ => ({ ...openQ, name: openQ[name] }))

  if (type === 'category') {
    structure.questionModules = structure.questionModules.map(
      qMod => ({
        ...qMod, name: categoryNames[qMod.id.toString()]
      }))

    return assessmentCopy
  }

  structure.questionModules = assessmentCopy.structure.questionModules.map(qMod => ({
    ...qMod,
    name: categoryNames[qMod.id.toString()],
    objectives: qMod.objectives.map(categoryOb => (
      { ...categoryOb, name: objNames[categoryOb.id] }
    ))
  }))

  assessmentCopy.structure = structure
  return assessmentCopy
}

const deleteSelfAssesment = {
  prepare: id => SelfAssessment.findByPk(id),
  value: (instance) => {
    const json = instance.toJSON()
    return {
      id: json.id,
      course_instance_id: json.course_instance_id
    }
  },
  execute: instance => instance.destroy()
}

module.exports = {
  addSelfAssesment,
  getUserSelfAssesments,
  getAssesmentsForCourse,
  getAssessmentType,
  updateSelfAssesment,
  getOne,
  toggleAssessment,
  setAssessmentStatus,
  isFeedbackActive,
  delete: deleteSelfAssesment
}
