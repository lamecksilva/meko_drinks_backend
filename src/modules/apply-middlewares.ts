import compression from 'compression'
import cors from 'cors'
import { Application, json, static as expressStatic, urlencoded } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { logger } from '../utils'

export async function applyMiddlewares(app: Application): Promise<void> {
  app.use(cors())
  app.use(helmet())
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(compression())
  app.use('/static', expressStatic('static'))

  process.env.NODE_ENV === 'development' && app.use(morgan('dev'))

  logger.info('Middlewares configurados.')
}
