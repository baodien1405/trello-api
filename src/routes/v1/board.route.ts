import express from 'express'

import { asyncHandler } from '@/helpers'
import { createBoardSchema } from '@/validations'
import { BoardController } from '@/controllers'
import { validator } from '@/middlewares'

const router = express.Router()

router.post('/', validator(createBoardSchema), asyncHandler(BoardController.createBoard))

export const BoardRoute = router
