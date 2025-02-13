import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'

import { CREATED, OK } from '@/core'
import { InvitationService } from '@/services'

const createNewBoardInvitation = async (req: Request, res: Response, next: NextFunction) => {
  const inviterId = new ObjectId(req.user._id)

  new CREATED({
    message: 'Successfully!',
    metadata: await InvitationService.createNewBoardInvitation(req.body, inviterId)
  }).send(res)
}

const getInvitationList = async (req: Request, res: Response, next: NextFunction) => {
  const userId = new ObjectId(req.user._id)

  new OK({
    message: 'Get invitations successfully!',
    metadata: await InvitationService.getInvitationList(userId)
  }).send(res)
}

const updateBoardInvitation = async (req: Request, res: Response, next: NextFunction) => {
  const payload = {
    userId: new ObjectId(req.user._id),
    invitationId: new ObjectId(req.params.invitationId),
    status: req.body.status
  }

  new OK({
    message: 'Successfully!',
    metadata: await InvitationService.updateBoardInvitation(payload)
  }).send(res)
}

export const InvitationController = {
  createNewBoardInvitation,
  getInvitationList,
  updateBoardInvitation
}
