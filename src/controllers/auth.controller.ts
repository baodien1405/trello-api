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
  new SuccessResponse({
    message: 'Successfully!',
    metadata: await AuthService.login(req.body)
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
