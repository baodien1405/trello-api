import express from 'express'

import { asyncHandler } from '@/helpers'
import { columnSchema } from '@/validations'
import { ColumnController } from '@/controllers'
import { authMiddleware, ValidationSource, validator } from '@/middlewares'

const router = express.Router()

router.use(authMiddleware.authentication)

router.post('/', validator(columnSchema.createColumn), asyncHandler(ColumnController.createColumn))

router.get(
  '/:id',
  validator(columnSchema.getColumnDetails, ValidationSource.PARAM),
  asyncHandler(ColumnController.getColumnDetails)
)

router.patch(
  '/:id',
  validator(columnSchema.updateColumn, ValidationSource.BODY, { allowUnknown: true }),
  asyncHandler(ColumnController.updateColumn)
)

router.delete(
  '/:id',
  validator(columnSchema.deleteColumn, ValidationSource.PARAM),
  asyncHandler(ColumnController.deleteColumn)
)

export const ColumnRoute = router
