import { Router } from 'express'

import { userController } from '../controllers'

const router = Router()

export async function userRouter(): Promise<Router> {
  router.get('/all', userController.returnAllUsers)

  return router
}
