export async function welcomeMailJob(): Promise<void> {
  // cron.chedule......
  process.env.NODE_ENV === 'development' && console.info('Welcome Mail')
}
