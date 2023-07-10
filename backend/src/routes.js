const morgan = require('morgan')
const headersMiddleware = require('unfuck-utf8-headers-middleware')
const logger = require('./utils/logger')
const categories = require('./controllers/category_controller')
const courses = require('./controllers/course_controller')
const persons = require('./controllers/person_controller')
const tasks = require('./controllers/task_controller')
const courseInstances = require('./controllers/course_instance_controller')
const objectives = require('./controllers/objective_controller')
const selfAssesment = require('./controllers/self_assesment_controller')
const session = require('./controllers/session_controller')
const types = require('./controllers/type_controller')
const skillLevels = require('./controllers/skill_level_controller')
const assesmentResponse = require('./controllers/assesment_response_controller')
const coursePersons = require('./controllers/course_person_controller')
const grades = require('./controllers/grade_controller')

const validateLang = require('./middleware/lang')
const auth = require('./middleware/token_auth')

const BASE_URL = '/api'

const accessLogger = morgan((tokens, req, res) => {
  const fields = ['method', 'url', 'status', 'response-time', 'remote-addr', 'remote-user', 'user-agent', 'referrer']
  const name = req.user ? req.user.username : 'undefined name'
  const message = [
    name, ':',
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
  const meta = req.decodedToken ? req.decodedToken : {}
  fields.forEach((field) => { meta[field] = tokens[field](req, res) })
  logger.info(message, meta)
})

const shibbolethHeaders = [
  'displayname',
  'employeenumber',
  'schacpersonaluniquecode',
  'uid'
]

module.exports = (app) => {
  app.use(headersMiddleware(shibbolethHeaders))
  app.use(validateLang)
  app.use(auth)
  app.use(accessLogger)
  app.use(`${BASE_URL}/categories`, categories)
  app.use(`${BASE_URL}/courses`, courses)
  app.use(`${BASE_URL}/persons`, persons)
  app.use(`${BASE_URL}/tasks`, tasks)
  app.use(`${BASE_URL}/course-instances`, courseInstances)
  app.use(`${BASE_URL}/objectives`, objectives)
  app.use(`${BASE_URL}/assesmentresponse`, assesmentResponse)
  app.use(`${BASE_URL}/selfassesment`, selfAssesment)
  app.use(`${BASE_URL}/logout`, session)
  app.use(`${BASE_URL}/types`, types)
  app.use(`${BASE_URL}/skill-levels`, skillLevels)
  app.use(`${BASE_URL}/course-persons`, coursePersons)
  app.use(`${BASE_URL}/grades`, grades)
}
