import { NextFunction, Request, Response } from 'express'

import { returnAllUsersDB } from '../../database'
import { Responses } from '../../utils'

export const userController = {
  returnAllUsers: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const users = await returnAllUsersDB()

      return Responses.success(res, users)
    } catch (err) {
      next(err)
    }
  },
}
