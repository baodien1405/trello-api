import express from 'express'

import { asyncHandler } from '@/helpers'
import { createBoardSchema, getBoardDetailsSchema, updateBoardSchema } from '@/validations'
import { BoardController } from '@/controllers'
import { ValidationSource, validator } from '@/middlewares'

const router = express.Router()

router.post('/', validator(createBoardSchema), asyncHandler(BoardController.createBoard))
router.get(
  '/:id',
  validator(getBoardDetailsSchema, ValidationSource.PARAM),
  asyncHandler(BoardController.getBoardDetails)
)
router.patch(
  '/:id',
  validator(updateBoardSchema, ValidationSource.BODY, { allowUnknown: true }),
  asyncHandler(BoardController.updateBoard)
)

export const BoardRoute = router
