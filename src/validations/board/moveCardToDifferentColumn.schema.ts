import Joi from 'joi'
import { MoveCardDiffColumnPayload } from '@/types'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'

export const moveCardToDifferentColumnSchema = Joi.object<MoveCardDiffColumnPayload>({
  currentCardId: Joi.string().required().min(3).max(50).trim().strict(),
  prevColumnId: Joi.string().required().min(3).max(50).trim().strict(),
  prevCardOrderIds: Joi.array()
    .required()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  nextColumnId: Joi.string().required().min(3).max(50).trim().strict(),
  nextCardOrderIds: Joi.array()
    .required()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([])
})
