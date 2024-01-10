import { ObjectId } from 'mongodb'

export interface Card {
  boardId: ObjectId
  columnId: ObjectId
  title: string
  description?: string
  createdAt: Date | number
  updatedAt: Date | number
  _destroy: boolean
}
