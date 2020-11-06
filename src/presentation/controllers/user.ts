import { compare, hash } from 'bcrypt'
import { NextFunction, Request, Response } from 'express'

import {
  getUserByEmailDB,
  getUserById,
  getUserByIdWPassword,
  removeUserDB,
  returnAllUsersDB,
  saveNewUserDB,
  updatePasswordDB,
  updateUserDB,
} from '../../database'
import { jwtSign, Responses } from '../../utils'

export const userController = {
  returnAllUsers: async (_: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const users = await returnAllUsersDB()

      return Responses.success(res, users)
    } catch (err) {
      next(err)
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
  updateUser: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await updateUserDB(req.params.id, req.body)

      const updatedUser = await getUserById(req.params.id)

      return Responses.success(res, updatedUser)
    } catch (err) {
      next(err)
    }
  },
  updatePassword: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const user = await getUserByIdWPassword(req.params.id)

      const match = await compare(req.body?.oldPassword, user.password)

      if (!match) {
        return Responses.error(
          res,
          { oldPassword: 'Password not match' },
          'Error while update password'
        )
      } else {
        const passwordCrypted = await hash(req.body.password, 10)

        await updatePasswordDB(req.params.id, passwordCrypted)

        const user = await getUserById(req.params.id)

        return Responses.success(res, user)
      }
    } catch (err) {
      next(err)
    }
  },
  removeUser: async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const user = await removeUserDB(req.params.id)

      return Responses.success(res, user)
    } catch (err) {
      next(err)
    }
  },
}
