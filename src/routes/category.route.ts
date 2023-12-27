import express from 'express'
import { asyncHandler } from '@/helpers'
import { CategoryController } from '@/controllers/category.controller'

const router = express.Router()

router.get('/', asyncHandler(CategoryController.findAllCategories))

export { router as CategoryRoute }
