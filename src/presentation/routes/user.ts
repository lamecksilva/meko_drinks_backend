import { Router } from 'express'
import passport from 'passport'

import {
  updateUserPasswordValidationMiddleware,
  updateUserValidationMiddleware,
  userLoginValidationMiddleware,
  userSignUpValidationMiddleware,
} from '../../validation'
import { userController } from '../controllers'

const router = Router()

export async function userRouter(): Promise<Router> {
  router.get('/all', userController.returnAllUsers)

  router.post('/', userSignUpValidationMiddleware, userController.signUpUser)

  router.post('/login', userLoginValidationMiddleware, userController.loginUser)

  router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    updateUserValidationMiddleware,
    userController.updateUser
  )

  router.put(
    '/password/:id',
    passport.authenticate('jwt', { session: false }),
    updateUserPasswordValidationMiddleware,
    userController.updatePassword
  )

  router.delete('/:id', passport.authenticate('jwt', { session: false }), userController.removeUser)

  return router
}
