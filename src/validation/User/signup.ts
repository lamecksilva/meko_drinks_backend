import { NextFunction, Request, Response } from 'express'
import { Rules } from 'validatorjs'

import { User } from '../../database'
import { Responses } from '../../utils'
import { validator } from '../../utils/validator'

export async function userSignUpValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | any> {
  const rules: Rules = {
    name: 'required|string|min:3|max:30',
    email: 'required|email',
    password: 'required|confirmed|min:6|max:25',
  }

  await validator(req.body, rules, {})
    .then(async () => {
      await User.findOne({ email: req.body.email })
        .then((user) => {
          if (user) {
            Responses.error(res, { email: 'Email já cadastrado' }, 'Ocorreu um erro no cadastro')
          } else {
            next()
          }
        })
        .catch((error) => {
          return Responses.error(res, error, 'Ocorreu um erro no cadastro')
        })
    })
    .catch((err) => {
      return Responses.error(res, err, 'Ocorreu um erro no cadastro')
    })
}
