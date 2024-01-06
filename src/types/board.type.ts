import { ObjectId } from 'mongodb'

export interface Board {
  title: string
  description: string
  type: string
  slug?: string
  columnOrderIds: Array<ObjectId>
  createdAt?: Date
  updatedAt?: Date
  _destroy?: boolean
}
