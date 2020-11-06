import { mailsJobs } from './mails'

export async function startJobs(): Promise<void> {
  mailsJobs()
}
