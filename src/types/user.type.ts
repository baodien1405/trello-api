import { UserRole } from '@/enums'

export interface User {
  email: string
  password: string
  username: string
  displayName: string
  avatar?: string | null
  role?: UserRole
  isActive?: boolean
  verifyToken: string
  createdAt?: number
  updatedAt?: number
  _destroy?: boolean
}
