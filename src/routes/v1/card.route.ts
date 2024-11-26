import express from 'express'

import { asyncHandler } from '@/helpers'
import { cardSchema } from '@/validations'
import { CardController } from '@/controllers'
import { authMiddleware, ValidationSource, validator } from '@/middlewares'

const router = express.Router()

router.use(authMiddleware.authentication)

router.post('/', validator(cardSchema.createCard), asyncHandler(CardController.createCard))
router.get(
  '/:id',
  validator(cardSchema.getCardDetails, ValidationSource.PARAM),
  asyncHandler(CardController.getCardDetails)
)

export const CardRoute = router
