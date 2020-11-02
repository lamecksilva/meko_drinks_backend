import compression from 'compression'
import cors from 'cors'
import { Application, json, urlencoded } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { connectDB } from '../database'
import { logger } from '../utils'

export async function applyMiddlewares(app: Application): Promise<void> {
  app.use(urlencoded({ extended: true }))
  app.use(compression())
  app.use(helmet())
  app.use(cors())
  app.use(json())

  connectDB()

  process.env.NODE_ENV === 'development' && app.use(morgan('dev'))

  logger.info('Middlewares configurados.')
}
