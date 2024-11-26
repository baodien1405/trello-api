import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

import { NotAcceptable, NotFoundError } from '@/core'
import { UserModel } from '@/models'
import { UpdateUserPayload } from '@/types'
import { getInfoData } from '@/utils'

const updateUser = async (userId: ObjectId, body: UpdateUserPayload) => {
  const existUser = await UserModel.findOneById(userId)

  if (!existUser) throw new NotFoundError('Account not found!')

  if (!existUser.isActive) throw new NotAcceptable('Your account is not active')

  let updatedUser

  if (body.current_password && body.new_password) {
    if (!bcrypt.compareSync(body.current_password, existUser.password)) {
      throw new NotAcceptable('Your current password is incorrect!')
    }

    const passwordHash = await bcrypt.hash(body.new_password, 10)

    updatedUser = await UserModel.updateUser(existUser._id, {
      password: passwordHash
    })
  } else {
    updatedUser = await UserModel.updateUser(existUser._id, body)
  }

  return getInfoData({
    fields: ['_id', 'email', 'username', 'displayName', 'verifyToken', 'role'],
    object: updatedUser
  })
}

export const UserService = {
  updateUser
}
