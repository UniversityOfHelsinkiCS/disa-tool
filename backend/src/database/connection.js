const Sequelize = require('sequelize')
const logger = require('../utils/logger')
const { DATABASE_URL } = require('../../conf-backend.js')
require('pg').defaults.parseInt8 = true

const sequelize = new Sequelize(DATABASE_URL, { logging: false })

const syncDatabase = async () => {
  try {
    await sequelize.sync()
    logger.info('synced database')
  } catch (e) {
    logger.error(e)
  }
}

const forceSyncDatabase = async () => {
  try {
    await sequelize.sync({ force: true })
    logger.info('forced database')
  } catch (e) {
    logger.error(e)
  }
}

module.exports = {
  sequelize,
  syncDatabase,
  forceSyncDatabase
}
