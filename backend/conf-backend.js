const fs = require('fs')
const dotenv = require('dotenv')

if (!process.env.GITHUB_ACTIONS) {
  dotenv.config({ path: `${__dirname}/.env` })
} else {
  dotenv.config({ path: process.env.DATABASE_URL })
}
const readFile = (filename) => {
  let content
  try {
    content = fs.readFileSync(filename)
  } catch (e) {
    return null
  }
  return content
}

const samldata = {
  metadata: readFile('./samldata/metadata.xml'),
  key: readFile('./samldata/key.pem'),
  cert: readFile('./samldata/cert.pem'),
  idp_public_cert: readFile('./samldata/idp_public_cert.pem')
}

const {
  NODE_ENV,
  DATABASE_URL,
  FRONTEND_LOGIN,
  ENTITY_ID,
  ASSERT_ENDPOINT,
  SSO_LOGIN_URL,
  SECRET,
  IDP_ENTITY_ID
} = process.env

module.exports = {
  NODE_ENV,
  dialect: 'postgres',
  DATABASE_URL,
  FRONTEND_LOGIN,
  ENTITY_ID,
  ASSERT_ENDPOINT,
  SSO_LOGIN_URL,
  SSO_LOGOUT_URL: SSO_LOGIN_URL,
  SECRET,
  IDP_ENTITY_ID,
  samldata
}
