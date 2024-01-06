import { ObjectId } from 'mongodb'
import Joi, { ValidationError } from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'
import { Column } from '@/types'
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
  return await getDB().collection(COLUMN_COLLECTION_NAME).insertOne(validData)
}

const findOneById = async (id: ObjectId) => {
  return await getDB()
    .collection(COLUMN_COLLECTION_NAME)
    .findOne({
      _id: new ObjectId(id)
    })
}

export const ColumnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createColumn,
  findOneById
}
