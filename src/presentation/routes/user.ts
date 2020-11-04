import { Router } from 'express'

// import passport from 'passport'
import { userSignUpValidationMiddleware } from '../../validation'
import { userController } from '../controllers'

const router = Router()

export async function userRouter(): Promise<Router> {
  router.get('/all', userController.returnAllUsers)

  router.post(
    '/',
    // passport.authenticate('jwt', { session: false }),
    userSignUpValidationMiddleware,
    userController.signUpUser
  )

  return router
}
