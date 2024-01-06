import Joi, { ValidationError } from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'
import { Card } from '@/types'
import { getErrorMessage } from '@/utils'
import { ConflictRequestError } from '@/core'
import { getDB } from '@/database'
import { ObjectId } from 'mongodb'

const CARD_COLLECTION_NAME = 'cards'

const CARD_COLLECTION_SCHEMA = Joi.object<Card>({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreateCard = async (data: Card) => {
  try {
    return await CARD_COLLECTION_SCHEMA.validateAsync(data)
  } catch (error) {
    console.log('🚀 ~ validateBeforeCreateCard ~ error:', error)
    const message = getErrorMessage(error as ValidationError)
    throw new ConflictRequestError(message)
  }
}

const createCard = async (data: Card) => {
  const validData = await validateBeforeCreateCard(data)
  return await getDB().collection(CARD_COLLECTION_NAME).insertOne(validData)
}

const findOneById = async (id: ObjectId) => {
  return await getDB()
    .collection(CARD_COLLECTION_NAME)
    .findOne({
      _id: new ObjectId(id)
    })
}

export const CardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createCard,
  findOneById
}
