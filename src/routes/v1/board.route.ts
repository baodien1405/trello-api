import express from 'express'

import { asyncHandler, validator } from '@/helpers'
import { createBoardSchema } from '@/validations'
import { BoardController } from '@/controllers'

const router = express.Router()

router.post('/', validator(createBoardSchema), asyncHandler(BoardController.createBoard))

export const BoardRoute = router
