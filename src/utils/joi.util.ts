import Joi from 'joi'

export function extractField(schema: Joi.ObjectSchema, field: string) {
  return Joi.object({
    [field]: schema.extract(field)
  })
}
