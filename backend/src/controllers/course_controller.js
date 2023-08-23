const router = require('express').Router()
const logger = require('../utils/logger')

const courseService = require('../services/course_service')
const personService = require('../services/person_service')
const { errors } = require('../messages/global')
const { checkPrivilege } = require('../services/privilege')

const messages = {
  create: {
    eng: 'New course has been created.',
    fin: 'Kurssi luotu onnistuneesti.',
    swe: '"Kurssi luotu onnistuneesti." ruotsiksi.'
  },
  rename: {
    eng: 'Course has been renamed',
    fin: 'Kurssin nimi on nyt vaihdettu.',
    swe: '"Kurssi luotu onnistuneesti." ruotsiksi.'
  }
}

router.get('/', async (req, res) => {
  const courses = await courseService.getCourses(req.lang)
  res.status(200).json(courses)
})

router.put('/instance/:courseId/toggle', async (req, res) => {
  const { courseId } = req.params
  const isTeacher = await checkPrivilege(req, [{
    key: 'teacher_on_course',
    param: courseId
  }])
  if (!isTeacher) {
    res.status(403).json({ toast: errors.privilege.toast, error: errors.privilege[req.lang] })
    return
  }
  const instance = await courseService.toggleActivity(courseId)
  res.status(200).json(instance)
})

router.post('/instance/:courseId/tasks', async (req, res) => {
  try {
    const { instance } = req.body
    const { id } = instance
    if (!instance) {
      res.status(401).json({ error: 'Instance not found' })
      return
    }

    const isTeacher = await checkPrivilege(req, [{
      key: 'teacher_on_course',
      param: id
    }])
    if (!isTeacher) {
      res.status(403).json({ toast: errors.privilege.toast, error: errors.privilege[req.lang] })
      return
    }

    const people = await personService.getPeopleOnCourse(id, instance.tasks.map((task) => task.id))
    instance.people = people
    instance.tasks = instance.tasks.map((task) => ({
      ...task,
      types: task.types.map((ttype) => ({ ...ttype, name: `${ttype.type_header.name} ${ttype.name}` })
      )
    }))

    res.status(200).json(instance)
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      res.status(500).json({
        error: e.message
      })
    } else {
      res.status(500).json({
        error: errors.unexpected[req.lang]
      })
      logger.error(e)
    }
  }
})

router.get('/instance/:courseId', async (req, res) => {
  const { courseId } = req.params
  const { user } = req
  const instance = await courseService.getInstanceWithRelatedData(courseId, req.lang, user.id)
  if (!instance) {
    res.status(404).json({
      toast: errors.notfound.toast,
      error: errors.notfound[req.lang]
    })
    return
  }
  const hasPrivilege = await checkPrivilege(req, [
    {
      key: 'student_on_course',
      param: courseId
    }
  ])
  if (!hasPrivilege) {
    res.status(403).json({
      course_id: instance.course_id,
      id: instance.id
    })
    return
  }
  const teachers = await personService.getCourseTeachers(courseId)
  instance.dataValues.people = teachers

  instance.dataValues.courseRole = instance.people[0].course_person.role

  res.status(200).json(instance)
})

router.get('/user', async (req, res) => {
  const { user } = req
  const instances = await courseService.getCoursesForPerson(user.id, req.lang)
  res.status(200).json(instances)
})

router.get('/:courseId', async (req, res) => {
  const { courseId } = req.params
  const instances = await courseService.getCourseInstancesOfCourse(Number(courseId), req.user, req.lang)
  res.status(200).json(instances)
})

router.get('/details/:courseId', async (req, res) => {
  const { courseId } = req.params
  const course = await courseService.getCourse(Number(courseId), req.user, req.lang)
  res.status(200).json(course)
})

router.put('/details/:courseId', async (req, res) => {
  const { courseId } = req.params
  const { eng_name, fin_name, swe_name } = req.body
  const isTeacher = await checkPrivilege(req, [{
    key: 'global_teacher',
    param: courseId
  }])

  if (!isTeacher) {
    res.status(403).json({ toast: errors.privilege.toast, error: errors.privilege[req.lang] })
    return
  }
  const updatedCourse = await courseService.editCourse({ id: courseId, eng_name, fin_name, swe_name })
  res.status(200).json(updatedCourse)
})

router.post('/create', async (req, res) => {
  try {
    if (!await checkPrivilege(req, [
      {
        key: 'global_teacher'
      }
    ])) {
      res.status(403).json({
        toast: errors.privilege.toast,
        error: errors.privilege[req.lang]
      })
      return
    }
    const toCreate = courseService.create.prepare(req.body)
    await courseService.create.execute(toCreate)
    const created = courseService.create.value(toCreate, req.lang)
    res.status(200).json({
      toast: true,
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

module.exports = router
