import { Request, Response, NextFunction } from 'express'
import { ProductService } from '@/services'
import { SuccessResponse } from '@/core'

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  new SuccessResponse({
    message: 'Create new product success!',
    metadata: await ProductService.createProduct(req.body)
  }).send(res)
}

const findAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  new SuccessResponse({
    message: 'Get list product success!',
    metadata: await ProductService.findAllProducts(req.query)
  }).send(res)
}

export const ProductController = {
  createProduct,
  findAllProducts
}
