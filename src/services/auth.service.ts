import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { BrevoProvider } from '@/config'
import { WEBSITE_DOMAIN } from '@/constants'
import { BadRequestError, ConflictRequestError, NotAcceptable, NotFoundError } from '@/core'
import { UserModel } from '@/models'
import { Login, Register, Verify } from '@/types'
import { createTokenPair, getInfoData } from '@/utils'

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
    const verificationLink = `${WEBSITE_DOMAIN}/account/verification?email=${newUser.email}&token=${newUser.verifyToken}`
    const customSubject = 'Trello: Please verify your email before using our services!'
    const htmlContent = `
      <h3>Here is verification link:</h3>
      <h3>${verificationLink}</h3>
      <h3>Sincerely,</br> - baodien1405 - </h3>
    `

    await BrevoProvider.sendEmail({
      recipientEmail: newUser.email,
      subject: customSubject,
      htmlContent: htmlContent
    })

    return {
      user: getInfoData({ fields: ['_id', 'email', 'username', 'displayName', 'verifyToken', 'role'], object: newUser })
    }
  }

  throw new BadRequestError('Error with register!')
}

const login = async ({ email, password }: Login) => {
  const existUser = await UserModel.findOneByEmail(email)

  if (!existUser) throw new NotFoundError('Account not found!')

  if (!existUser.isActive) throw new NotAcceptable('Your account is not active')

  if (!bcrypt.compareSync(password, existUser.password)) throw new NotAcceptable('Your email or password is incorrect!')

  const userInfo = {
    _id: existUser._id,
    email: existUser.email
  }

  const { accessToken, refreshToken } = createTokenPair(userInfo)

  return {
    user: getInfoData({
      fields: ['_id', 'email', 'username', 'displayName', 'verifyToken', 'role'],
      object: existUser
    }),
    accessToken,
    refreshToken
  }
}

const verify = async ({ email, token }: Verify) => {
  const existUser = await UserModel.findOneByEmail(email)

  if (!existUser) throw new NotFoundError('Account not found!')

  if (existUser.isActive) throw new NotAcceptable('Your account is already active')

  if (token !== existUser.verifyToken) throw new NotAcceptable('Token is invalid!')

  const updateData = {
    isActive: true,
    verifyToken: null
  }

  const updatedUser = await UserModel.updateUser(existUser._id, updateData)

  return {
    user: getInfoData({
      fields: ['_id', 'email', 'username', 'displayName', 'verifyToken', 'role'],
      object: updatedUser
    })
  }
}

export const AuthService = {
  register,
  login,
  verify
}
