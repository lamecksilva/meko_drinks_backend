import { NextFunction, Request, Response } from 'express'
import { Rules } from 'validatorjs'

import { Responses } from '../../utils'
import { validator } from '../../utils/validator'

export function userSignUpValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const rules: Rules = {
    name: 'required|string|min:3',
    email: 'required|email',
  }

  validator(req.body, rules, {}, (err, passed) => {
    if (!passed) {
      Responses.error(res, err, 'Ocorreu um erro no cadastro')
    } else {
      next()
    }
  })
  next()
}
