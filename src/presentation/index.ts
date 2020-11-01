import { Application, Request, Response } from 'express'

// import { imagesRouter } from './router';
import { logger } from '../utils'

export async function applyRoutes(app: Application): Promise<void> {
  // app.use('/images', await imagesRouter());
  app.use('/', (req: Request, res: Response) => res.json({ message: 'Hello World' }))

  logger.info('🔀 Rotas configuradas. 🛠')
}
