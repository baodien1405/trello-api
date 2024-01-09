import { ObjectId } from 'mongodb'

export interface Board {
  _id: ObjectId
  title: string
  description: string
  type: string
  slug?: string
  columnOrderIds: Array<ObjectId>
  createdAt?: number
  updatedAt?: number
  _destroy?: boolean
}
