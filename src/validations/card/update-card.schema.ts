import Joi from 'joi'
import { Card } from '@/types'

export const updateCardSchema = Joi.object<Card>({
  title: Joi.string().min(3).max(50).trim().strict(),
  description: Joi.string().optional()
})
