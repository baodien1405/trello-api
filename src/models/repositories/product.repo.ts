import { ORDER, SORT_BY } from '@/constants'
import { ProductModel } from '@/models'
import { QueryProductParams } from '@/types'
import { getSelectData } from '@/utils'

const findAllProducts = async ({
  limit,
  page,
  search,
  category,
  price_max,
  price_min,
  sort_by,
  order,
  select
}: QueryProductParams) => {
  page = Number(page)
  limit = Number(limit)
  const skip = (page - 1) * limit

  const condition: any = {}

  if (category) {
    condition.product_category = category
  }

  if (price_max) {
    condition.product_price = {
      $lte: Number(price_max)
    }
  }

  if (price_min) {
    condition.product_price = condition.product_price
      ? { ...condition.product_price, $gte: Number(price_min) }
      : { $gte: Number(price_min) }
  }

  if (!ORDER.includes(order as string)) {
    order = ORDER[0]
  }

  if (!SORT_BY.includes(sort_by as string)) {
    sort_by = SORT_BY[0]
  }

  if (search) {
    condition.product_name = {
      $regex: search,
      $options: 'i'
    }
  }

  const totalProductPromise = ProductModel.count()
  const productsPromise = ProductModel.find(condition)
    .populate({
      path: 'product_category'
    })
    .sort({ [sort_by]: order === 'desc' ? -1 : 1 })
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean()

  const [totalProduct, products] = await Promise.all([totalProductPromise, productsPromise])

  return {
    items: products,
    pagination: {
      page: page,
      limit: limit,
      totalRows: totalProduct
    }
  }
}

export const ProductRepository = {
  findAllProducts
}
