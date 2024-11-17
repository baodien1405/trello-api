import { ObjectId } from 'mongodb'

export interface Login {
  email: string
  password: string
}

export interface Register {
  email: string
  password: string
}

export interface Verify {
  email: string
  token: string
}

export interface AuthPayload {
  _id: ObjectId
  email: string
}
