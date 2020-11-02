import { connect, connection } from 'mongoose'

import { logger } from '../utils'

const { MONGODB_URI, MONGODB_NAME } = process.env

export async function connectDB(): Promise<void> {
  try {
    await connect(MONGODB_URI || 'mongodb://127.0.0.1:27017/meko_drinks', {
      dbName: MONGODB_NAME || 'meko_drinks',
      connectTimeoutMS: 10000,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      keepAlive: true,
      poolSize: 10,
      useFindAndModify: false,
    })

    // logger.info(`🍃 MongoDB Connected.✅`)
  } catch (err) {
    logger.error('🍃 MongoDB Connection ERROR ❌')
    logger.error(err)
  }
}

connection.on('connected', () => {
  logger.info(`🍃 MongoDB Connected.✅`)
})

connection.on('connecting', () => {
  logger.info('🍃 Connecting to MongoDB...🔌')
})
