import Joi, { ValidationError } from 'joi'
import { ObjectId } from 'mongodb'

import { EMAIL_RULE, EMAIL_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'
import { ConflictRequestError } from '@/core'
import { getDB } from '@/database'
import { Card, Comment } from '@/types'
import { getErrorMessage } from '@/utils'

const CARD_COLLECTION_NAME = 'cards'

const CARD_COLLECTION_SCHEMA = Joi.object<Card>({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),
  cover: Joi.string().default(null),
  memberIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
  comments: Joi.array()
    .items({
      userId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      userEmail: Joi.string().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
      userAvatar: Joi.string(),
      userDisplayName: Joi.string(),
      content: Joi.string(),
      commentedAt: Joi.date().timestamp()
    })
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createdAt']

const validateBeforeCreateCard = async (data: Card) => {
  try {
    return await CARD_COLLECTION_SCHEMA.validateAsync(data)
  } catch (error) {
    const message = getErrorMessage(error as ValidationError)
    throw new ConflictRequestError(message)
  }
}

const createCard = async (data: Card) => {
  const validData = await validateBeforeCreateCard(data)
  const newCardToAdd = {
    ...validData,
    boardId: new ObjectId(validData.boardId),
    columnId: new ObjectId(validData.columnId)
  }

  return await getDB().collection(CARD_COLLECTION_NAME).insertOne(newCardToAdd)
}

const findOneById = async (id: ObjectId) => {
  return await getDB()
    .collection<Card>(CARD_COLLECTION_NAME)
    .findOne({
      _id: new ObjectId(id)
    })
}

const updateCard = async (cardId: ObjectId, payload: Partial<Card>) => {
  Object.keys(payload).forEach((fieldName) => {
    if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
      delete payload[fieldName as keyof Card]
    }
  })

  if (payload.columnId) payload.columnId = new ObjectId(payload.columnId)

  return await getDB()
    .collection(CARD_COLLECTION_NAME)
    .findOneAndUpdate({ _id: new ObjectId(cardId) }, { $set: payload }, { returnDocument: 'after' })
}

const deleteManyByColumnId = async (columnId: ObjectId) => {
  return await getDB()
    .collection<Card>(CARD_COLLECTION_NAME)
    .deleteMany({
      columnId: new ObjectId(columnId)
    })
}

const unshiftNewComment = async ({
  cardId,
  commentData,
  updatedAt
}: {
  cardId: ObjectId
  commentData: Comment
  updatedAt: number
}) => {
  return await getDB()
    .collection<Card>(CARD_COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: new ObjectId(cardId) },
      { $push: { comments: { $each: [commentData], $position: 0 } }, $set: { updatedAt } },
      { returnDocument: 'after' }
    )
}

export const CardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createCard,
  findOneById,
  updateCard,
  deleteManyByColumnId,
  unshiftNewComment
}
