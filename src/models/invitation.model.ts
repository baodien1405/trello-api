import Joi, { ValidationError } from 'joi'
import { ObjectId } from 'mongodb'

import { BOARD_INVITATION_STATUS, INVITATION_TYPES, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'
import { ConflictRequestError } from '@/core'
import { getDB } from '@/database'
import { Invitation } from '@/types'
import { getErrorMessage } from '@/utils'

const INVITATION_COLLECTION_NAME = 'invitations'

const INVITATION_COLLECTION_SCHEMA = Joi.object<Invitation>({
  inviterId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  inviteeId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  type: Joi.string()
    .required()
    .valid(...Object.values(INVITATION_TYPES)),
  boardInvitation: Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    status: Joi.string()
      .required()
      .valid(...Object.values(BOARD_INVITATION_STATUS))
  }).optional(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'inviterId', 'inviteeId', 'type', 'createdAt']

const validateBeforeCreateNewBoardInvitation = async (data: Invitation) => {
  try {
    return await INVITATION_COLLECTION_SCHEMA.validateAsync(data)
  } catch (error) {
    const message = getErrorMessage(error as ValidationError)
    throw new ConflictRequestError(message)
  }
}

const createNewBoardInvitation = async (data: Invitation) => {
  const validData = await validateBeforeCreateNewBoardInvitation(data)
  const newInvitationToAdd = {
    ...validData,
    inviterId: new ObjectId(validData.inviterId),
    inviteeId: new ObjectId(validData.inviteeId)
  }

  if (validData.boardInvitation) {
    newInvitationToAdd.boardInvitation = {
      ...validData.boardInvitation,
      boardId: new ObjectId(validData.boardInvitation.boardId)
    }
  }

  return await getDB().collection(INVITATION_COLLECTION_NAME).insertOne(newInvitationToAdd)
}

const findOneById = async (id: ObjectId) => {
  return await getDB()
    .collection(INVITATION_COLLECTION_NAME)
    .findOne({
      _id: new ObjectId(id)
    })
}

const updateInvitation = async (invitationId: ObjectId, payload: Partial<Invitation>) => {
  Object.keys(payload).forEach((fieldName) => {
    if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
      delete payload[fieldName as keyof Invitation]
    }
  })

  if (payload.boardInvitation) {
    payload.boardInvitation = {
      ...payload.boardInvitation,
      boardId: new ObjectId(payload.boardInvitation.boardId)
    }
  }

  return await getDB()
    .collection(INVITATION_COLLECTION_NAME)
    .findOneAndUpdate({ _id: new ObjectId(invitationId) }, { $set: payload }, { returnDocument: 'after' })
}

export const InvitationModel = {
  INVITATION_COLLECTION_NAME,
  INVITATION_COLLECTION_SCHEMA,
  createNewBoardInvitation,
  findOneById,
  updateInvitation
}
