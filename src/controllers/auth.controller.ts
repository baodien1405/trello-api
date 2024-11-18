import { Request, Response, NextFunction } from 'express'

import { AuthService } from '@/services'
import { CREATED, SuccessResponse } from '@/core'

const register = async (req: Request, res: Response, next: NextFunction) => {
  new CREATED({
    message: 'Successfully!',
    metadata: await AuthService.register(req.body)
  }).send(res)
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const result = await AuthService.login(req.body)
  const LIFE_TIME_COOKIE = 1000 * 60 * 24 * 14

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: LIFE_TIME_COOKIE
  })

  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: LIFE_TIME_COOKIE
  })

  new SuccessResponse({
    message: 'Successfully!',
    metadata: result
  }).send(res)
}

const verify = async (req: Request, res: Response, next: NextFunction) => {
  new SuccessResponse({
    message: 'Successfully!',
    metadata: await AuthService.verify(req.body)
  }).send(res)
}

export const AuthController = {
  register,
  login,
  verify
}
