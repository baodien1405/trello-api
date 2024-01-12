import { ObjectId, WithId } from 'mongodb'
import Joi, { ValidationError } from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'
import { Card, Column } from '@/types'
import { getErrorMessage } from '@/utils'
import { ConflictRequestError } from '@/core'
import { getDB } from '@/database'

const COLUMN_COLLECTION_NAME = 'columns'

const COLUMN_COLLECTION_SCHEMA = Joi.object<Column>({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  cardOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createdAt']

const validateBeforeCreateColumn = async (data: Column) => {
  try {
    return await COLUMN_COLLECTION_SCHEMA.validateAsync(data)
  } catch (error) {
    const message = getErrorMessage(error as ValidationError)
    throw new ConflictRequestError(message)
  }
}

const createColumn = async (data: Column) => {
  const validData = await validateBeforeCreateColumn(data)
  const newColumnToAdd = {
    ...validData,
    boardId: new ObjectId(validData.boardId)
  }

  return await getDB().collection(COLUMN_COLLECTION_NAME).insertOne(newColumnToAdd)
}

const findOneById = async (id: ObjectId) => {
  return await getDB()
    .collection<Column>(COLUMN_COLLECTION_NAME)
    .findOne({
      _id: new ObjectId(id)
    })
}

const pushCardOrderIds = async (card: WithId<Card>) => {
  await getDB()
    .collection<Column>(COLUMN_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: new ObjectId(card.columnId) },
      { $push: { cardOrderIds: new ObjectId(card._id) } },
      { returnDocument: 'after' }
    )
}

const updateColumn = async (columnId: ObjectId, payload: Partial<Column>) => {
  Object.keys(payload).forEach((fieldName) => {
    if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
      delete payload[fieldName as keyof Column]
    }
  })

  if (payload.cardOrderIds) {
    payload.cardOrderIds = payload.cardOrderIds.map((_id) => new ObjectId(_id))
  }

  return await getDB()
    .collection(COLUMN_COLLECTION_NAME)
    .findOneAndUpdate({ _id: new ObjectId(columnId) }, { $set: payload }, { returnDocument: 'after' })
}

const deleteOneById = async (columnId: ObjectId) => {
  return await getDB()
    .collection<Column>(COLUMN_COLLECTION_NAME)
    .deleteOne({
      _id: new ObjectId(columnId)
    })
}

export const ColumnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createColumn,
  findOneById,
  pushCardOrderIds,
  updateColumn,
  deleteOneById
}
