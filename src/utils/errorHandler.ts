import { Errback } from 'express'

import { logger } from './logger'

export async function errorHandler(error: Error | Errback | any): Promise<void> {
  console.log(error)
  logger.error(error)
}
