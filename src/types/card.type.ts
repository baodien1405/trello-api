import { ObjectId } from 'mongodb'

export interface Card {
  boardId: ObjectId
  columnId: ObjectId
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date
  _destroy: boolean
}
