/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Validator, { ErrorMessages, Rules } from 'validatorjs'

export async function validator(
  body: any,
  rules: Rules,
  customMessages: ErrorMessages
): Promise<any> {
  return new Promise((resolve, reject) => {
    const validator = new Validator(body, rules, customMessages)
    const handleFails = () => {
      // console.log(validator.errors)
      reject(validator.errors.all())
    }

    // Asynchronous handler (with callbacks)
    if (validator.hasAsync) {
      validator.passes(() => resolve())
      validator.fails(() => handleFails())
    } else {
      // Synchronous handler
      if (validator.passes()) {
        resolve()
      } else {
        handleFails()
      }
    }
  })
}
