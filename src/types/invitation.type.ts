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
