import { ObjectId } from 'mongodb'

import { BOARD_INVITATION_STATUS, INVITATION_TYPES } from '@/constants'
import { NotFoundError } from '@/core'
import { BoardModel, InvitationModel, UserModel } from '@/models'
import { InvitationPayload } from '@/types'
import { getInfoData } from '@/utils'

const createNewBoardInvitation = async (body: InvitationPayload, inviterId: ObjectId) => {
  const inviter = await UserModel.findOneById(inviterId)
  if (!inviter) throw new NotFoundError('Inviter not found!')

  const invitee = await UserModel.findOneByEmail(body.inviteeEmail)
  if (!invitee) throw new NotFoundError('Invitee not found!')

  const board = await BoardModel.findOneById(body.boardId)
  if (!board) throw new NotFoundError('Board not found!')

  const invitationData = {
    inviterId: inviterId.toString(),
    inviteeId: invitee._id.toString(),
    type: INVITATION_TYPES.BOARD_INVITATION,
    boardInvitation: {
      boardId: board._id.toString(),
      status: BOARD_INVITATION_STATUS.PENDING
    }
  }

  const createdInvitation = await InvitationModel.createNewBoardInvitation(invitationData)
  const invitation = await InvitationModel.findOneById(createdInvitation.insertedId)

  return {
    ...invitation,
    board,
    inviter: getInfoData({
      fields: ['_id', 'email', 'username', 'displayName', 'verifyToken', 'role', 'avatar'],
      object: inviter
    }),
    invitee: getInfoData({
      fields: ['_id', 'email', 'username', 'displayName', 'verifyToken', 'role', 'avatar'],
      object: invitee
    })
  }
}

export const InvitationService = {
  createNewBoardInvitation
}
