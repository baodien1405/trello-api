import Joi, { ValidationError } from 'joi'
import { Board, Column, QueryBoardParams } from '@/types'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'
import { getDB } from '@/database'
import { ObjectId, WithId } from 'mongodb'
import { ConflictRequestError } from '@/core'
import { getErrorMessage, pagingSkipValue } from '@/utils'
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

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

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
  return await getDB()
    .collection<Board>(BOARD_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      { $push: { columnOrderIds: new ObjectId(column._id) } },
      { returnDocument: 'after' }
    )
}

const pullColumnOrderIds = async (column: WithId<Column>) => {
  return await getDB()
    .collection<Board>(BOARD_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      { $pull: { columnOrderIds: new ObjectId(column._id) } },
      { returnDocument: 'after' }
    )
}

const updateBoard = async (boardId: ObjectId, payload: Partial<Board>) => {
  Object.keys(payload).forEach((fieldName) => {
    if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
      delete payload[fieldName as keyof Board]
    }
  })

  if (payload.columnOrderIds) {
    payload.columnOrderIds = payload.columnOrderIds.map((_id) => new ObjectId(_id))
  }

  return await getDB()
    .collection(BOARD_COLLECTION_NAME)
    .findOneAndUpdate({ _id: new ObjectId(boardId) }, { $set: payload }, { returnDocument: 'after' })
}

const getBoardList = async ({ page, limit }: QueryBoardParams) => {
  const queryConditions = [{ _destroy: false }]

  const query = await getDB()
    .collection(BOARD_COLLECTION_NAME)
    .aggregate(
      [
        { $match: { $and: queryConditions } },
        { $sort: { title: 1 } }, //title A-Z
        {
          $facet: {
            boards: [{ $skip: pagingSkipValue(page, limit) }, { $limit: limit }],
            totalBoards: [{ $count: 'countedBoards' }]
          }
        }
      ],
      { collation: { locale: 'en' } }
    )
    .toArray()

  return {
    boards: query[0].boards || [],
    pagination: {
      page,
      limit,
      totalRows: query[0].totalBoards[0]?.countedBoards || 0
    }
  }
}

export const BoardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createBoard,
  findOneById,
  getBoardDetails,
  pushColumnOrderIds,
  pullColumnOrderIds,
  updateBoard,
  getBoardList
}
