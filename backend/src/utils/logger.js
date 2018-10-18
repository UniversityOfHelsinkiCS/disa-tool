const winston = require('winston')
require('winston-log2gelf')

const transports = []

if (process.env.LOG_PORT && process.env.LOG_HOST) {
  transports.push(new winston.transports.Log2gelf({
    hostname: process.env.LOG_HOSTNAME || 'disa',
    host: process.env.LOG_HOST,
    port: process.env.LOG_PORT,
    protocol: 'http'
  }))
}

if (process.env.NODE_ENV !== 'test') {
  transports.push(new winston.transports.File({ filename: 'debug.log' }))
}

transports.push(new winston.transports.Console({ level: 'debug' }))

const logger = winston.createLogger({ transports, exitOnError: false })

module.exports = logger