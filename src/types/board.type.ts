export interface Board {
  title: string
  description: string
  columnOrderIds?: Array<string>
  createdAt?: Date
  updatedAt?: Date
  _destroy?: boolean
}
