import { BOARD_INVITATION_STATUS } from '@/constants'
import { ObjectId } from 'mongodb'

export interface InvitationPayload {
  inviteeEmail: string
  boardId: ObjectId
}

export interface Invitation {
  inviterId: ObjectId | string
  inviteeId: ObjectId | string
  type: string
  boardInvitation?: {
    boardId: ObjectId | string
    status: string
  }
  createdAt?: string
  updatedAt?: string
  _destroy?: boolean
}

export interface UpdateBoardInvitation {
  invitationId: ObjectId
  status: keyof typeof BOARD_INVITATION_STATUS
}
