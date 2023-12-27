import { Request, Response, NextFunction } from 'express'
import { CategoryService } from '@/services'
import { SuccessResponse } from '@/core'

const findAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  new SuccessResponse({
    message: 'Get list category success!',
    metadata: await CategoryService.findAllCategories()
  }).send(res)
}

export const CategoryController = {
  findAllCategories
}
