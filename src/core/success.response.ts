import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export class SuccessResponse {
  message: string
  status: string
  code: number
  metadata: any
  constructor({ message = '', statusCode = StatusCodes.OK, reasonStatusCode = ReasonPhrases.OK, metadata = {} }) {
    this.message = !message ? reasonStatusCode : message
    this.status = reasonStatusCode
    this.code = statusCode
    this.metadata = metadata
  }

  send(res: Response, headers = {}) {
    return res.status(this.code).json(this)
  }
}

export class OK extends SuccessResponse {
  constructor({ message, metadata }: { message: string; metadata: any }) {
    super({ message, metadata })
  }
}

export class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.CREATED,
    reasonStatusCode = ReasonPhrases.CREATED,
    metadata
  }: {
    message: string
    statusCode?: number
    reasonStatusCode?: ReasonPhrases
    metadata: any
  }) {
    super({ message, statusCode, reasonStatusCode, metadata })
  }
}
