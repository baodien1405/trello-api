import Joi, { ValidationError } from 'joi'
import { ObjectId } from 'mongodb'

import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '@/constants'
import { ConflictRequestError } from '@/core'
import { getDB } from '@/database'
import { UserRole } from '@/enums'
import { User } from '@/types'
import { getErrorMessage } from '@/utils'

const USER_COLLECTION_NAME = 'users'

const USER_COLLECTION_SCHEMA = Joi.object<User>({
  email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
  password: Joi.string().required().min(6).pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE),
  username: Joi.string().required().trim().strict(),
  displayName: Joi.string().required().trim().strict(),
  avatar: Joi.string().default(null),
  role: Joi.string().valid(UserRole.Client, UserRole.Admin).default(UserRole.Client),
  isActive: Joi.boolean().default(false),
  verifyToken: Joi.string(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'email', 'username', 'createdAt']

const validateBeforeCreateUser = async (data: User) => {
  try {
    return await USER_COLLECTION_SCHEMA.validateAsync(data)
  } catch (error) {
    const message = getErrorMessage(error as ValidationError)
    throw new ConflictRequestError(message)
  }
}

const createUser = async (data: User) => {
  const validData = await validateBeforeCreateUser(data)
  return await getDB().collection(USER_COLLECTION_NAME).insertOne(validData)
}

const findOneById = async (id: ObjectId) => {
  return await getDB()
    .collection(USER_COLLECTION_NAME)
    .findOne({
      _id: new ObjectId(id)
    })
}

const findOneByEmail = async (email: string) => {
  return await getDB().collection(USER_COLLECTION_NAME).findOne({
    email
  })
}

const updateUser = async (userId: ObjectId, payload: Partial<User>) => {
  Object.keys(payload).forEach((fieldName) => {
    if (INVALID_UPDATE_FIELDS.includes(fieldName)) {
      delete payload[fieldName as keyof User]
    }
  })

  return await getDB()
    .collection(USER_COLLECTION_NAME)
    .findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: payload }, { returnDocument: 'after' })
}

export const UserModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createUser,
  findOneById,
  findOneByEmail,
  updateUser
}
