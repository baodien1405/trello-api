import { ProductModel } from '@/models'
import { ProductRepository } from '@/models/repositories'
import { IProduct } from '@/types'

const createProduct = async (payload: IProduct) => {
  const { product_name, product_thumb, product_description, product_price, product_quantity, product_category } =
    payload

  const newProduct = await ProductModel.create({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_quantity,
    product_category
  })

  return newProduct
}

const findAllProducts = async ({
  page = 1,
  limit = 30,
  search = '',
  category = '',
  price_max = 0,
  price_min = 0,
  sort_by = '',
  order = '',
  select = [
    'product_name',
    'product_thumb',
    'product_description',
    'product_price',
    'product_quantity',
    'product_category'
  ]
}) => {
  return await ProductRepository.findAllProducts({
    limit,
    page,
    search,
    category,
    price_max,
    price_min,
    sort_by,
    order,
    select
  })
}

export const ProductService = {
  createProduct,
  findAllProducts
}
