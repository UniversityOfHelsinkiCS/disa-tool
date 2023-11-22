import logger from '../../backend/src/utils/logger'
import create_data from '../../backend/src/database/create_data'

async function globalSetup(config) {
  logger.info('Global setup started')
}

export default globalSetup
