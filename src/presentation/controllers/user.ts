import { hash } from 'bcrypt'
import { NextFunction, Request, Response } from 'express'

import { returnAllUsersDB, saveNewUserDB } from '../../database'
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
  signUpUser: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      console.log('SignUP CONTROLLER ')
      const passwordCrypted = await hash(req.body.password, 10)

      const newUser = await saveNewUserDB({ ...req.body, password: passwordCrypted })

      return Responses.success(res, newUser)
    } catch (err) {
      next(err)
    }
  },
}
