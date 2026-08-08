import jwt from 'jsonwebtoken'
import { AuthPayload } from '@/types'
import { env } from '@/config'

export const createTokenPair = (payload: AuthPayload) => {
  const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET_SIGNATURE as string, { expiresIn: '1d' })
  const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET_SIGNATURE as string, { expiresIn: '7d' })

  return { accessToken, refreshToken }
}

export const verifyJWT = async (token: string, keySecret: string) => {
  const decodedToken = await jwt.verify(token, keySecret)
  return decodedToken as AuthPayload
}
