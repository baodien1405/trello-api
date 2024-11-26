import express from 'express'

import { asyncHandler } from '@/helpers'
import { boardSchema } from '@/validations'
import { BoardController } from '@/controllers'
import { authMiddleware, ValidationSource, validator } from '@/middlewares'

const router = express.Router()

router.use(authMiddleware.authentication)

router.post('/', validator(boardSchema.createBoard), asyncHandler(BoardController.createBoard))

router.get('/', asyncHandler(BoardController.getBoardList))

router.get(
  '/:id',
  validator(boardSchema.getBoardDetails, ValidationSource.PARAM),
  asyncHandler(BoardController.getBoardDetails)
)

router.patch(
  '/:id',
  validator(boardSchema.updateBoard, ValidationSource.BODY, { allowUnknown: true }),
  asyncHandler(BoardController.updateBoard)
)

router.put(
  '/supports/moving_card',
  validator(boardSchema.moveCardToDifferentColumn),
  asyncHandler(BoardController.moveCardToDifferentColumn)
)

export const BoardRoute = router
