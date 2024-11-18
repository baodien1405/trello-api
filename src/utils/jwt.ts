import jwt from 'jsonwebtoken'
import { AuthFailureError } from '@/core'
import { AuthPayload } from '@/types'
import { env } from '@/config'

export const createTokenPair = (payload: AuthPayload) => {
  const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET_SIGNATURE as string, { expiresIn: '1h' })
  const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET_SIGNATURE as string, { expiresIn: '14 days' })

  return { accessToken, refreshToken }
}

export const verifyJWT = async (token: string, keySecret: string) => {
  const decodedToken = await jwt.verify(token, keySecret)
  return decodedToken as AuthPayload
}
