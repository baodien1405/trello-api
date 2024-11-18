import express from 'express'

import { asyncHandler } from '@/helpers'
import { createColumnSchema, deleteColumnSchema, getColumnDetailsSchema, updateColumnSchema } from '@/validations'
import { ColumnController } from '@/controllers'
import { authMiddleware, ValidationSource, validator } from '@/middlewares'

const router = express.Router()

router.use(authMiddleware.authentication)

router.post('/', validator(createColumnSchema), asyncHandler(ColumnController.createColumn))

router.get(
  '/:id',
  validator(getColumnDetailsSchema, ValidationSource.PARAM),
  asyncHandler(ColumnController.getColumnDetails)
)

router.patch(
  '/:id',
  validator(updateColumnSchema, ValidationSource.BODY, { allowUnknown: true }),
  asyncHandler(ColumnController.updateColumn)
)

router.delete(
  '/:id',
  validator(deleteColumnSchema, ValidationSource.PARAM),
  asyncHandler(ColumnController.deleteColumn)
)

export const ColumnRoute = router
