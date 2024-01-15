import express from 'express'

import { asyncHandler } from '@/helpers'
import {
  createBoardSchema,
  getBoardDetailsSchema,
  moveCardToDifferentColumnSchema,
  updateBoardSchema
} from '@/validations'
import { BoardController } from '@/controllers'
import { ValidationSource, validator } from '@/middlewares'

const router = express.Router()

router.post('/', validator(createBoardSchema), asyncHandler(BoardController.createBoard))

router.get('/', asyncHandler(BoardController.getBoardList))

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

router.put(
  '/supports/moving_card',
  validator(moveCardToDifferentColumnSchema),
  asyncHandler(BoardController.moveCardToDifferentColumn)
)

export const BoardRoute = router
