import { logger } from '../utils'

const { NODE_ENV, SERVER_PORT, SERVER_NAME, MONGODB_URI, MONGODB_NAME } = process.env

if (!NODE_ENV) {
  logger.warn('NODE_ENV not informed in env')
}

if (!SERVER_PORT) {
  logger.warn('SERVER_PORT not informed in env')
}

if (!SERVER_NAME) {
  logger.warn('SERVER_NAME not informed in env')
}

if (!MONGODB_URI) {
  logger.warn('MONGODB_URI not informed in env')
}

if (!MONGODB_NAME) {
  logger.warn('MONGODB_NAME not informed in env')
}
