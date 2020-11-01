import { existsSync, mkdirSync } from 'fs'
import { createLogger, format, transports } from 'winston'

const { combine, colorize, timestamp, printf, errors } = format

interface TransformableInfo {
  level: string
  message: string
  [key: string]: any
}

/**
 * logger
 */
export const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    errors({ stack: true }),
    printf((info: TransformableInfo) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
})

const folderName = 'log'

if (!existsSync(folderName)) {
  mkdirSync(folderName)
}

export const eventLogger = createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'DD-MM-YYYY HH:mm:ss',
    }),
    printf((info: TransformableInfo) => `${info.timestamp}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: `${folderName}/events.log`,
    }),
  ],
})
