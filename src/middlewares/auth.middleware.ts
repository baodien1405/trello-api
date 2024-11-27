import { NextFunction, Request, Response } from 'express'

import { asyncHandler } from '@/helpers'
import { AuthFailureError } from '@/core'
import { verifyJWT } from '@/utils'
import { env } from '@/config'

const authentication = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.accessToken

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
