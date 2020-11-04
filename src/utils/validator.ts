/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Validator, { ErrorMessages, Errors, Rules } from 'validatorjs'

export const validator = (
  body: any,
  rules: Rules,
  customMessages: ErrorMessages,
  callback: (errors: Errors | null, passed: boolean) => void
): void => {
  const validation = new Validator(body, rules, customMessages)

  validation.passes(() => callback(null, true))
  validation.fails(() => callback(validation.errors, false))
}
