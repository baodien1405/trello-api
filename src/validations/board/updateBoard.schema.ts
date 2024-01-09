import Joi from 'joi'
import { Board } from '@/types'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'

export const updateBoardSchema = Joi.object<Board>({
  title: Joi.string().min(3).max(50).trim().strict(),
  description: Joi.string().min(3).max(256).trim().strict(),
  type: Joi.string().valid('public', 'private'),
  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([])
})
