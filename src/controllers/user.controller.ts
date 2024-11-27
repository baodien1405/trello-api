import { NextFunction, Request, Response } from 'express'

import { SuccessResponse } from '@/core'
import { UserService } from '@/services'

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  new SuccessResponse({
    message: 'Successfully!',
    metadata: await UserService.updateUser(req.user._id, req.body, req.file)
  }).send(res)
}

export const UserController = {
  updateUser
}
