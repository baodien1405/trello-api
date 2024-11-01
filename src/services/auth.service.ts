import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { BadRequestError, ConflictRequestError } from '@/core'
import { UserModel } from '@/models'
import { Login, Register } from '@/types'
import { getInfoData } from '@/utils'

const register = async ({ email, password }: Register) => {
  const existUser = await UserModel.findOneByEmail(email)

  if (existUser) {
    throw new ConflictRequestError('Email already exists!')
  }

  const nameFromEmail = email.split('@')[0]
  const passwordHash = await bcrypt.hash(password, 10)

  const userCreated = await UserModel.createUser({
    email,
    password: passwordHash,
    username: nameFromEmail,
    displayName: nameFromEmail,
    verifyToken: uuidv4()
  })

  const newUser = await UserModel.findOneById(userCreated.insertedId)

  if (newUser) {
    return {
      user: getInfoData({ fields: ['_id', 'email', 'username', 'displayName', 'verifyToken', 'role'], object: newUser })
    }
  }

  throw new BadRequestError('Error with register!')
}

const login = async ({ email, password }: Login) => {
  return {}
}

export const AuthService = {
  register,
  login
}
