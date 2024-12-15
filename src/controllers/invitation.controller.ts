import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'

import { SuccessResponse } from '@/core'
import { InvitationService } from '@/services'

const createNewBoardInvitation = async (req: Request, res: Response, next: NextFunction) => {
  const inviterId = new ObjectId(req.user._id)

  new SuccessResponse({
    message: 'Successfully!',
    metadata: await InvitationService.createNewBoardInvitation(req.body, inviterId)
  }).send(res)
}

export const InvitationController = {
  createNewBoardInvitation
}
