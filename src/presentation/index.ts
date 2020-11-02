import { Application, Errback, Request, Response } from 'express'

import { logger } from '../utils'
import { userRouter } from './routes'

export async function applyRoutes(app: Application): Promise<void> {
  // app.use('/images', await imagesRouter());
  app.get('/', (_: Request, res: Response) =>
    res.json({
      message: `${process.env?.SERVER_NAME || 'Server Name'} Online`,
      version: `${process.env?.npm_package_version || '0.0.0'}`,
    })
  )

  app.use('/users', await userRouter())

  app.use((_: Request, res: Response) => {
    res.status(404).json({ message: 'Not Found' })
  })

  app.use((err: Errback, _: Request, res: Response) => {
    return res.status(500).json({ message: 'Internal Server Error', err })
  })

  logger.info('Rotas configuradas.')
}
