import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '@/core'
import { getErrorMessage } from '@/utils'

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params'
}

export const validator = (schema: Joi.AnySchema, source: ValidationSource = ValidationSource.BODY) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source])

      if (!error) return next()

      const message = getErrorMessage(error)

      next(new BadRequestError(message))
    } catch (error) {
      next(error)
    }
  }
}
