const router = require('express').Router()
const logger = require('../utils/logger')
const gradeService = require('../services/grade_service')
const { errors } = require('../messages/global')
const { checkPrivilege, onlyTeacherOnCourseHasAccess } = require('../services/privilege')
const editRoutes = require('../utils/editRoutes')

const messages = {
  course: {
    eng: '"Kurssin arvosteluperusteet haettu onnistuneesti." englanniksi.',
    fin: 'Kurssin arvosteluperusteet haettu onnistuneesti.',
    swe: '"Kurssin arvosteluperusteet haettu onnistuneesti." ruotsiksi.'
  },
  create: {
    eng: '"Arvosteluperuste tallennettu onnistuneesti." englanniksi.',
    fin: 'Arvosteluperuste tallennettu onnistuneesti.',
    swe: '"Arvosteluperuste tallennettu onnistuneesti." ruotsiksi.'
  },
  delete: {
    eng: '"Arvosteluperuste poistettu onnistuneesti." englanniksi.',
    fin: 'Arvosteluperuste poistettu onnistuneesti.',
    swe: '"Arvosteluperuste poistettu onnistuneesti." ruotsiksi.'
  },
  details: {
    eng: '"Arvosteluperusteen tiedot haettu onnistuneesti." englanniksi.',
    fin: 'Arvosteluperusteen tiedot haettu onnistuneesti.',
    swe: '"Arvosteluperusteen tiedot haettu onnistuneesti." ruotsiksi.'
  },
  edit: {
    eng: '"Arvosteluperuste muokattu onnistuneesti." englanniksi.',
    fin: 'Arvosteluperuste muokattu onnistuneesti.',
    swe: '"Arvosteluperuste muokattu onnistuneesti." ruotsiksi.'
  }
}

router.get('/course/:id', async (req, res) => {
  try {
    const data = await gradeService.getByCourse(req.params.id, req.lang)
    res.status(200).json({
      message: messages.course[req.lang],
      data
    })
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      res.status(500).json({
        error: e
      })
    } else {
      res.status(500).json({
        error: errors.unexpected[req.lang]
      })
      logger.error(e)
    }
  }
})

router.post('/create', async (req, res) => {
  try {
    const { instance: toCreate, skillLevel } = await gradeService.create.prepare(req.body)
    if (!await checkPrivilege(req, [
      {
        key: 'teacher_on_course',
        param: skillLevel.course_instance_id
      }
    ])) {
      res.status(403).json({
        error: errors.privilege[req.lang]
      })
      return
    }
    await gradeService.create.execute(toCreate)
    const created = gradeService.create.value(toCreate, req.lang)
    const categoryGrades = await gradeService.createDefaultCategoryGrades(created, skillLevel.course_instance_id)
    created.category_grades = categoryGrades
    res.status(200).json({
      message: messages.create[req.lang],
      created
    })
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      res.status(500).json({
        error: e
      })
    } else {
      res.status(500).json({
        error: errors.unexpected[req.lang]
      })
      logger.error(e)
    }
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const toDelete = await gradeService.delete.prepare(req.params.id)
    if (!toDelete) {
      res.status(404).json({
        error: errors.notfound[req.lang]
      })
      return
    }
    if (!await checkPrivilege(req, [
      {
        key: 'teacher_on_course',
        param: toDelete.dataValues.skill_level.course_instance_id
      }
    ])) {
      res.status(403).json({
        error: errors.privilege[req.lang]
      })
      return
    }
    const deleted = gradeService.delete.value(toDelete)
    gradeService.delete.execute(toDelete)
    res.status(200).json({
      message: messages.delete[req.lang],
      deleted
    })
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      res.status(500).json({
        error: e
      })
    } else {
      res.status(500).json({
        error: errors.unexpected[req.lang]
      })
      logger.error(e)
    }
  }
})

router.put('/category-grades', async (req, res) => {
  const { courseId, categoryGrades } = req.body
  if (!(await onlyTeacherOnCourseHasAccess(req, res, courseId))) return
  try {
    const filteredCategoryGrades = await gradeService.filterCategoryGradesOnCourse(courseId, categoryGrades)
    const updatedCategoryGrades = await gradeService.updateCategoryGrades(filteredCategoryGrades, categoryGrades)
    res.status(200).json({ message: 'category grades updated', updatedCategoryGrades })
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' })
    logger.error(e)
  }
})

editRoutes(router, {
  service: gradeService,
  messages,
  errors,
  pathToCourseInstanceId: ['skill_level', 'course_instance_id']
})

module.exports = router
