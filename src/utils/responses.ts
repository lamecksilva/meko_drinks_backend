import { Response } from 'express'

export const Responses = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  success: (res: Response, data?: any, message?: string): Response =>
    res.status(200).json({ success: true, message: message || '', payload: data }),
}
