import express from 'express'

import { asyncHandler } from '@/helpers'
import { createBoardSchema, getBoardDetailsSchema } from '@/validations'
import { BoardController } from '@/controllers'
import { ValidationSource, validator } from '@/middlewares'

const router = express.Router()

router.post('/', validator(createBoardSchema), asyncHandler(BoardController.createBoard))
router.get(
  '/:id',
  validator(getBoardDetailsSchema, ValidationSource.PARAM),
  asyncHandler(BoardController.getBoardDetails)
)

export const BoardRoute = router
