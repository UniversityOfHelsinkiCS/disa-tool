const router = require('express').Router()
const { validateLang } = require('../middleware/validate.js')

const courseService = require('../services/course_service.js')

router.get('/:courseId', validateLang, async (req, res) => {
    const { lang } = req.query
    const { courseId } = req.params
    const instances = await courseService.getCourseInstancesOfCourse(Number(courseId), lang)
    res.status(200).json(instances)
})

module.exports = router
