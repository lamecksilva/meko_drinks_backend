import { NextFunction, Request, Response } from 'express'
import { Rules } from 'validatorjs'

import { User } from '../../database'
import { Responses } from '../../utils'
import { validator } from '../../utils/validator'

/**
 * Middleware to validate fields of update user data
 * @param req Express Request Object
 * @param res Express Response Object
 * @param next Express Next Function
 */
export async function updateUserValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | any> {
  const rules: Rules = {
    name: 'required|string|min:3|max:30',
  }

  await validator(req.body, rules, {})
    .then(async () => {
      await User.findOne({ _id: req.params.id })
        .then((user) => {
          if (!user) {
            Responses.error(
              res,
              { id: 'User not found for this ID' },
              'There was an error in the update'
            )
          } else {
            next()
          }
        })
        .catch((error) => {
          return Responses.error(res, error, 'There was an error in the update')
        })
    })
    .catch((err) => {
      return Responses.error(res, err, 'There was an error in the update')
    })
}

/**
 * Middleware to validate fields of password update
 * @param req Express Request Object
 * @param res Express Response Object
 * @param next Express Next Function
 */
export async function updateUserPasswordValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | any> {
  const rules: Rules = {
    oldPassword: 'required|min:6|max:25',
    password: 'required|confirmed|min:6|max:25',
  }

  await validator(req.body, rules, {})
    .then(async () => {
      await User.findOne({ _id: req.params.id })
        .then((user) => {
          if (!user) {
            Responses.error(
              res,
              { id: 'User not found for this ID' },
              'There was an error in the update'
            )
          } else {
            next()
          }
        })
        .catch((error) => {
          return Responses.error(res, error, 'There was an error in the update')
        })
    })
    .catch((err) => {
      return Responses.error(res, err, 'There was an error in the update')
    })
}
