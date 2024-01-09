import express from 'express'

import { asyncHandler } from '@/helpers'
import { createColumnSchema, getColumnDetailsSchema, updateBoardSchema } from '@/validations'
import { ColumnController } from '@/controllers'
import { ValidationSource, validator } from '@/middlewares'

const router = express.Router()

router.post('/', validator(createColumnSchema), asyncHandler(ColumnController.createColumn))
router.get(
  '/:id',
  validator(getColumnDetailsSchema, ValidationSource.PARAM),
  asyncHandler(ColumnController.getColumnDetails)
)
router.patch(
  '/:id',
  validator(updateBoardSchema, ValidationSource.BODY, { allowUnknown: true }),
  asyncHandler(ColumnController.updateColumn)
)

export const ColumnRoute = router
