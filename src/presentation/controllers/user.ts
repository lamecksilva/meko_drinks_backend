import { compare, hash } from 'bcrypt'
import { NextFunction, Request, Response } from 'express'

import { getUserByEmailDB, getUserById, returnAllUsersDB, saveNewUserDB } from '../../database'
import { jwtSign } from '../../modules'
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
      const passwordCrypted = await hash(req.body.password, 10)

      const { _id } = await saveNewUserDB({ ...req.body, password: passwordCrypted })

      const newUser = await getUserById(_id)

      return Responses.success(res, newUser)
    } catch (err) {
      next(err)
    }
  },
  loginUser: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const user = await getUserByEmailDB(req.body.email)

      const match = await compare(req.body.password, user.password)

      if (!match) {
        return Responses.error(res, { password: 'Password not match' }, 'Error while login')
      }

      const { _id, name, email, avatar, status } = user

      const jwtToken = await jwtSign(
        { id: _id, name, email, avatar, status },
        { subject: `${_id}` }
      )

      return Responses.success(res, { token: jwtToken })
    } catch (err) {
      next(err)
    }
  },
}
