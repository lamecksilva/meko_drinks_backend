import express, { Application } from 'express'

import { startJobs } from './jobs'
import { applyMiddlewares } from './modules'
import { applyRoutes } from './presentation'
import { logger } from './utils'

export async function startServer(): Promise<void> {
  const SERVER_PORT: string | number = process.env.SERVER_PORT || 9002
  const SERVER_NAME: string | number = process.env.SERVER_NAME || 'Server'

  logger.info(`[ STATUS ] Starting ${SERVER_NAME}...`)
  const app: Application = express()

  await applyMiddlewares(app)

  await applyRoutes(app)

  await startJobs()

  app.listen(SERVER_PORT, () => {
    logger.info(`[ STATUS ] 🚀 ${SERVER_NAME} running on port: ${SERVER_PORT}`)
  })
}
