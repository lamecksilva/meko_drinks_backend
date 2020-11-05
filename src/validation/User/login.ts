import { NextFunction, Request, Response } from 'express'
import { Rules } from 'validatorjs'

import { User } from '../../database'
import { Responses } from '../../utils'
import { validator } from '../../utils/validator'

export async function userLoginValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | any> {
  const rules: Rules = {
    email: 'required|email',
    password: 'required|string',
  }

  await validator(req.body, rules, {})
    .then(async () => {
      await User.findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            Responses.error(
              res,
              { email: 'E-mail not registered' },
              'There was an error in the login'
            )
          } else {
            next()
          }
        })
        .catch((error) => {
          return Responses.error(res, error, 'There was an error in the login')
        })
    })
    .catch((err) => {
      return Responses.error(res, err, 'There was an error in the login')
    })
}
