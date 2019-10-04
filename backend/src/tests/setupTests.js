const supertest = require('supertest') // eslint-disable-line import/no-extraneous-dependencies
const app = require('../app.js')

require('dotenv').config()

global.server = supertest(app)

global.tokens = {
  student: 'jemisa',
  teacher: 'mikkoti',
  admin: 'kimjon'
}
jest.setTimeout(100000)
