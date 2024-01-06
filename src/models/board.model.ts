import Joi, { ValidationError } from 'joi'
import { Board, Column } from '@/types'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'
import { getDB } from '@/database'
import { ModifyResult, ObjectId, WithId } from 'mongodb'
import { ConflictRequestError } from '@/core'
import { getErrorMessage } from '@/utils'
import { ColumnModel } from './column.model'
import { CardModel } from './card.model'

const BOARD_COLLECTION_NAME = 'boards'

const BOARD_COLLECTION_SCHEMA = Joi.object<Board>({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid('public', 'private').required(),
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
  return await getDB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
}

const findOneById = async (id: ObjectId) => {
  return await getDB()
    .collection(BOARD_COLLECTION_NAME)
    .findOne({
      _id: new ObjectId(id)
    })
}

const getBoardDetails = async (id: ObjectId) => {
  const result = await getDB()
    .collection(BOARD_COLLECTION_NAME)
    .aggregate([
      {
        $match: {
          _id: new ObjectId(id),
          _destroy: false
        }
      },
      {
        $lookup: {
          from: ColumnModel.COLUMN_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          as: 'columns'
        }
      },
      {
        $lookup: {
          from: CardModel.CARD_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          as: 'cards'
        }
      }
    ])
    .toArray()

  return result[0] || null
}

const pushColumnOrderIds = async (column: WithId<Column>) => {
  await getDB()
    .collection<Board>(BOARD_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      { $push: { columnOrderIds: new ObjectId(column._id) } },
      { returnDocument: 'after' }
    )
}

export const BoardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createBoard,
  findOneById,
  getBoardDetails,
  pushColumnOrderIds
}
