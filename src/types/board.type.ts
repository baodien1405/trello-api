export interface Board {
  title: string
  description: string
  type: string
  slug?: string
  columnOrderIds?: Array<string>
  createdAt?: Date
  updatedAt?: Date
  _destroy?: boolean
}
