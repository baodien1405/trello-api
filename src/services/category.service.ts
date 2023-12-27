import { CategoryModel } from '@/models'

const findAllCategories = async () => {
  return await CategoryModel.find().lean()
}

export const CategoryService = {
  findAllCategories
}
