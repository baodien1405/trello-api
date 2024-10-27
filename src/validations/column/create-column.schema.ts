import Joi from 'joi'
import { Column } from '@/types'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'

export const createColumnSchema = Joi.object<Column>({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict()
})
