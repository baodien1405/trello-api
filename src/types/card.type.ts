import { ObjectId } from 'mongodb'

export interface Comment {
  userId: ObjectId
  userEmail: string
  userAvatar: string
  userDisplayName: string
  content: string
  commentedAt: Date
}

export interface Card {
  boardId: ObjectId
  columnId: ObjectId
  title: string
  description?: string
  cover?: string | null
  memberIds: Array<ObjectId>
  comments: Array<Comment>
  createdAt: Date | number
  updatedAt: Date | number
  _destroy: boolean
}
