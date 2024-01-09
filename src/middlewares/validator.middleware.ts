import Joi, { ValidationOptions } from 'joi'
import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '@/core'
import { getErrorMessage } from '@/utils'

export enum ValidationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params'
}

export const validator = (
  schema: Joi.AnySchema,
  source: ValidationSource = ValidationSource.BODY,
  options?: ValidationOptions
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source], options)

      if (!error) return next()

      const message = getErrorMessage(error)

      next(new BadRequestError(message))
    } catch (error) {
      next(error)
    }
  }
}
