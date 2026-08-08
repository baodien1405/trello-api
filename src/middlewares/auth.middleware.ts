import { NextFunction, Request, Response } from 'express'

import { asyncHandler } from '@/helpers'
import { AuthFailureError } from '@/core'
import { verifyJWT } from '@/utils'
import { env } from '@/config'

const authentication = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const accessToken = req.cookies?.accessToken || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null)

  if (!accessToken) throw new AuthFailureError('Token not found')

  try {
    const decodedAccessToken = await verifyJWT(accessToken, env.ACCESS_TOKEN_SECRET_SIGNATURE as string)

    req.user = decodedAccessToken

    return next()
  } catch (error: any) {
    throw new AuthFailureError('Unauthorized!')
  }
})

export const authMiddleware = {
  authentication
}
