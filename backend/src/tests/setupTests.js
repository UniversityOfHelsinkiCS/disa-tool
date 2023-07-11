const supertest = require('supertest') // eslint-disable-line import/no-extraneous-dependencies
const { TextEncoder, TextDecoder } = require('util')
const app = require('../app')

require('dotenv').config()

global.server = supertest(app)

global.tokens = {
  student: 'jemisa',
  teacher: 'mikkoti',
  admin: 'kimgjon'
}
jest.setTimeout(100000)

Object.assign(global, { TextDecoder, TextEncoder })
