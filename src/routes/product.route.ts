import express from 'express'
import { ProductController } from '@/controllers'
import { asyncHandler } from '@/helpers'

const router = express.Router()

router.post('/', asyncHandler(ProductController.createProduct))
router.get('/', asyncHandler(ProductController.findAllProducts))

export { router as ProductRoute }
