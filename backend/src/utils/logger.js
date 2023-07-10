const os = require('os')

const winston = require('winston')
const { WinstonGelfTransporter } = require('winston-gelf-transporter')

const { NODE_ENV } = require('../../conf-backend')

const transports = []

if (NODE_ENV === 'production') {
  transports.push(
    new WinstonGelfTransporter({
      handleExceptions: true,
      host: 'svm-116.cs.helsinki.fi',
      port: 9503,
      protocol: 'udp',
      hostName: os.hostname(),
      additional: {
        app: 'disa',
        environment: 'production'
      }
    })
  )

  transports.push(new winston.transports.File({ filename: 'debug.log' }))
}

const consoleLevel = NODE_ENV !== 'test' ? 'debug' : 'error'
transports.push(new winston.transports.Console({ level: consoleLevel }))

const logger = winston.createLogger({ transports, exitOnError: false })

module.exports = logger
