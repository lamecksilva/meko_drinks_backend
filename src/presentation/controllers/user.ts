import { NextFunction, Request, Response } from 'express'

import { returnAllUsersDB } from '../../database'
import { Responses } from '../../utils'

export const userController = {
  returnAllUsers: async (_: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const users = await returnAllUsersDB()

      return Responses.success(res, users)
    } catch (err) {
      next(err)
      // Responses.error(res, err, 'Return all users DB CONTROLLER')
    }
  },
}
