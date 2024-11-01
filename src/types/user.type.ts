import { ObjectId } from 'mongodb'

import { UserRole } from '@/enums'

export interface User {
  _id: ObjectId
  email: string
  password: string
  username: string
  displayName: string
  avatar: string | null
  role: UserRole
  isActive: boolean
  createdAt?: number
  updatedAt?: number
  _destroy?: boolean
}
