import { Types } from 'mongoose'

export interface QueryProductParams {
  limit: number
  page: number
  search: string
  category: string
  price_max: number
  price_min: number
  order: string
  sort_by: string
  select: string[]
}

export interface IProduct {
  product_name: string
  product_thumb: string
  product_description: string
  product_slug: string
  product_price: number
  product_quantity: number
  product_category: Types.ObjectId
}

export type ProductPayload = Pick<
  IProduct,
  | 'product_name'
  | 'product_thumb'
  | 'product_description'
  | 'product_price'
  | 'product_quantity'
  | 'product_type'
  | 'product_shop'
  | 'product_attributes'
>
