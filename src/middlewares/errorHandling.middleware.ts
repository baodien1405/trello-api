import { env } from '@/config'
import { ErrorResponse } from '@/core'
import { Request, Response, NextFunction } from 'express'

export const errorHandlingMiddleware = (error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.code || 500
  const errorResponse = {
    status: error.status,
    code: statusCode,
    stack: error.stack,
    message: error.message || 'Internal Server Error'
  }

  if (env.NODE_ENV !== 'development') delete errorResponse.stack

  return res.status(statusCode).json(errorResponse)
}
