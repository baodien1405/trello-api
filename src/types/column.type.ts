import { ObjectId } from 'mongodb'

export interface Column {
  boardId: ObjectId
  title: string
  cardOrderIds: Array<ObjectId>
  createdAt: Date
  updatedAt: Date
  _destroy: boolean
}
