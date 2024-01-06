import express from 'express'

import { asyncHandler } from '@/helpers'
import { createColumnSchema, getColumnDetailsSchema } from '@/validations'
import { ColumnController } from '@/controllers'
import { ValidationSource, validator } from '@/middlewares'

const router = express.Router()

router.post('/', validator(createColumnSchema), asyncHandler(ColumnController.createColumn))
router.get(
  '/:id',
  validator(getColumnDetailsSchema, ValidationSource.PARAM),
  asyncHandler(ColumnController.getColumnDetails)
)

export const ColumnRoute = router
