import { logger } from '../../utils'
import { welcomeMailJob } from './welcome'

export async function mailsJobs(): Promise<void> {
  await welcomeMailJob()

  logger.info('[ CRON-JOBs ] Mails loaded')
}
