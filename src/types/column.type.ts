import { ObjectId } from 'mongodb'
import { Card } from './card.type'

export interface Column {
  boardId: ObjectId
  title: string
  cardOrderIds: Array<ObjectId>
  cards: Array<Card>
  createdAt: number
  updatedAt: number
  _destroy: boolean
}
