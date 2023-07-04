const supertest = require('supertest') // eslint-disable-line import/no-extraneous-dependencies
const app = require('../app.js')
const { TextEncoder, TextDecoder } = require('util')


require('dotenv').config()

global.server = supertest(app)

global.tokens = {
  student: 'jemisa',
  teacher: 'mikkoti',
  admin: 'kimgjon'
}
jest.setTimeout(100000)

Object.assign(global, { TextDecoder, TextEncoder });
