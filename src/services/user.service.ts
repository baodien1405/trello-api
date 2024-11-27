import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

import { NotAcceptable, NotFoundError } from '@/core'
import { UserModel } from '@/models'
import { UpdateUserPayload, User } from '@/types'
import { getInfoData } from '@/utils'
import { CloudinaryProvider } from '@/config'

const updateUser = async (userId: ObjectId, body: UpdateUserPayload, userAvatarFile?: Express.Multer.File) => {
  const existUser = await UserModel.findOneById(userId)

  if (!existUser) throw new NotFoundError('Account not found!')

  if (!existUser.isActive) throw new NotAcceptable('Your account is not active')

  const { current_password, new_password } = body
  let updatedFields: Partial<User> = {}

  if (current_password && new_password) {
    const isPasswordValid = bcrypt.compareSync(current_password, existUser.password)

    if (!isPasswordValid) throw new NotAcceptable('Your current password is incorrect!')

    updatedFields.password = await bcrypt.hash(new_password, 10)
  } else if (userAvatarFile) {
    const uploadResult: any = await CloudinaryProvider.streamUpload(userAvatarFile.buffer, 'users')

    updatedFields.avatar = uploadResult.secure_url
  } else {
    updatedFields = body
  }

  const updatedUser = await UserModel.updateUser(existUser._id, updatedFields)

  return getInfoData({
    fields: ['_id', 'email', 'username', 'displayName', 'verifyToken', 'role', 'avatar'],
    object: updatedUser
  })
}

export const UserService = {
  updateUser
}
