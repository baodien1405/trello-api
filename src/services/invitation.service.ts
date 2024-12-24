import { ObjectId } from 'mongodb'

import { BOARD_INVITATION_STATUS, INVITATION_TYPES } from '@/constants'
import { BadRequestError, NotAcceptable, NotFoundError } from '@/core'
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

const getInvitationList = async (userId: ObjectId) => {
  const results = await InvitationModel.getInvitationList({
    userId: new ObjectId(userId)
  })

  return results
}

const updateBoardInvitation = async ({
  userId,
  invitationId,
  status
}: {
  userId: ObjectId
  invitationId: ObjectId
  status: keyof typeof BOARD_INVITATION_STATUS
}) => {
  const invitation = await InvitationModel.findOneById(invitationId)
  if (!invitation) throw new NotFoundError('Invitation not found!')

  const boardId = invitation.boardInvitation.boardId
  const board = await BoardModel.findOneById(boardId)
  if (!board) throw new NotFoundError('Board not found!')

  const boardOwnerAndMemberIds = [...board.ownerIds, ...board.memberIds].toString()
  if (status === BOARD_INVITATION_STATUS.ACCEPTED && boardOwnerAndMemberIds.includes(userId.toString())) {
    throw new NotAcceptable('You are already a member of this board!')
  }

  const updateData = {
    boardInvitation: {
      ...invitation.boardInvitation,
      status
    }
  }

  const updatedInvitation = await InvitationModel.updateInvitation(invitationId, updateData)
  if (!updatedInvitation) throw new BadRequestError('Failed to update invitation!')

  if (updatedInvitation.boardInvitation.status === BOARD_INVITATION_STATUS.ACCEPTED) {
    await BoardModel.pushMemberIds(boardId, userId)
  }

  return updatedInvitation
}

export const InvitationService = {
  createNewBoardInvitation,
  getInvitationList,
  updateBoardInvitation
}
