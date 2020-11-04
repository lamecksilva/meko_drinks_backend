import { Application, Errback, NextFunction, Request, Response } from 'express'

import { logger, Responses } from '../utils'
import { errorHandler } from '../utils/errorHandler'
import { userRouter } from './routes'

/**
 * Apply the routes in the app
 * @param app Application Express Object
 */
export async function applyRoutes(app: Application): Promise<void> {
  // app.use('/images', await imagesRouter());
  app.get('/', (_: Request, res: Response) => {
    return res.json({
      message: `${process.env?.SERVER_NAME || 'Server Name'} Online`,
      version: `${process.env?.npm_package_version || '0.0.0'}`,
    })
  })

  app.use('/users', await userRouter())

  app.use((req: Request, res: Response) => {
    return Responses.notFound(res, req)
  })

  app.use(async (err: Errback, _: Request, res: Response, next: NextFunction) => {
    errorHandler(err)

    return Responses.serverError(res, err, 'Internal Server Error')
  })

  logger.info('[ ROUTES ] Routes configured and ready.')
}
