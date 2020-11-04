export class ResponseError extends Error {
  constructor(message: string, type: string, status: number) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.type = type
    this.status = status
  }
  status
  type
}

export const ForbiddenError = class extends ResponseError {
  constructor() {
    super('Site access denied.', 'Forbidden', 403)
  }
}

export const InvalidTokenError = class extends ResponseError {
  constructor() {
    super('Specified token is invalid.', 'InvalidToken', 401)
  }
}
