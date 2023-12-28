import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export class ErrorResponse extends Error {
  status: string
  code: number
  constructor(message: string | ReasonPhrases, status: string, code: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(
    message: string | ReasonPhrases = ReasonPhrases.CONFLICT,
    status = ReasonPhrases.CONFLICT,
    code = StatusCodes.CONFLICT
  ) {
    super(message, status, code)
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(
    message: string | ReasonPhrases = ReasonPhrases.FORBIDDEN,
    status = ReasonPhrases.FORBIDDEN,
    code = StatusCodes.FORBIDDEN
  ) {
    super(message, status, code)
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(
    message: string | ReasonPhrases = ReasonPhrases.BAD_REQUEST,
    status = ReasonPhrases.BAD_REQUEST,
    code = StatusCodes.BAD_REQUEST
  ) {
    super(message, status, code)
  }
}

export class UnprocessableEntityRequestError extends ErrorResponse {
  constructor(
    message: string | ReasonPhrases = ReasonPhrases.UNPROCESSABLE_ENTITY,
    status = ReasonPhrases.UNPROCESSABLE_ENTITY,
    code = StatusCodes.UNPROCESSABLE_ENTITY
  ) {
    super(message, status, code)
  }
}

export class AuthFailureError extends ErrorResponse {
  constructor(
    message: string | ReasonPhrases = ReasonPhrases.UNAUTHORIZED,
    status = ReasonPhrases.UNAUTHORIZED,
    code = StatusCodes.UNAUTHORIZED
  ) {
    super(message, status, code)
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(
    message: string | ReasonPhrases = ReasonPhrases.NOT_FOUND,
    status = ReasonPhrases.NOT_FOUND,
    code = StatusCodes.NOT_FOUND
  ) {
    super(message, status, code)
  }
}
