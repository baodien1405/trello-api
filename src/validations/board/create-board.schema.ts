import Joi from 'joi'
import { Board } from '@/types'

export const createBoardSchema = Joi.object<Board>({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid('public', 'private').required()
})
