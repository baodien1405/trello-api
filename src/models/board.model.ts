import Joi, { ValidationError } from 'joi'
import { Board } from '@/types'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'
import { getDB } from '@/database'
import { ObjectId } from 'mongodb'
import { ConflictRequestError } from '@/core'
import { getErrorMessage } from '@/utils'

const BOARD_COLLECTION_NAME = 'boards'

const BOARD_COLLECTION_SCHEMA = Joi.object<Board>({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const validateBeforeCreateBoard = async (data: Board) => {
  try {
    return await BOARD_COLLECTION_SCHEMA.validateAsync(data)
  } catch (error) {
    const message = getErrorMessage(error as ValidationError)
    throw new ConflictRequestError(message)
  }
}

const createBoard = async (data: Board) => {
  const validData = await validateBeforeCreateBoard(data)
  console.log('🚀 ~ createBoard ~ validData:', validData)
  return await getDB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
}

const findOneById = async (id: ObjectId) => {
  return await getDB().collection(BOARD_COLLECTION_NAME).findOne({
    _id: id
  })
}

export const BoardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createBoard,
  findOneById
}
