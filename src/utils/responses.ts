import { Request, Response } from 'express'

export const Responses = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  success: (res: Response, data?: any, message?: string): Response =>
    res.status(200).json({ success: true, message: message || '', payload: data }),
  error: (res: Response, error?: Error, message?: string): Response =>
    res.status(400).json({ success: false, message: message || 'Error in request', error }),
  notFound: (res: Response, req: Request): Response =>
    res.status(404).json({ success: false, message: `Route ${req.route} not found` }),
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  serverError: (res: Response, error?: any, message?: string): Response =>
    res.status(500).json({ success: false, message: message || 'Internal Server Error', error }),
}
