import jwt from 'jsonwebtoken'
import { AuthFailureError } from '@/core'
import { AuthPayload } from '@/types'

export const createTokenPair = (payload: AuthPayload, publicKey: string, privateKey: string) => {
  const accessToken = jwt.sign(payload, publicKey, { expiresIn: '1h' })
  const refreshToken = jwt.sign(payload, privateKey, { expiresIn: '14 days' })

  return { accessToken, refreshToken }
}

export const verifyJWT = async (token: string, keySecret: string) => {
  try {
    const decodeUser = await jwt.verify(token, keySecret)
    return decodeUser as AuthPayload
  } catch (error) {
    throw new AuthFailureError('Token expired!')
  }
}
