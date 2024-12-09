import express from 'express'

import { asyncHandler } from '@/helpers'
import { cardSchema } from '@/validations'
import { CardController } from '@/controllers'
import { authMiddleware, multerUploadMiddleware, ValidationSource, validator } from '@/middlewares'

const router = express.Router()

router.use(authMiddleware.authentication)

router.post('/', validator(cardSchema.createCard), asyncHandler(CardController.createCard))

router.get(
  '/:id',
  validator(cardSchema.getCardDetails, ValidationSource.PARAM),
  asyncHandler(CardController.getCardDetails)
)

router.patch(
  '/:id',
  multerUploadMiddleware.upload.single('cardCover'),
  validator(cardSchema.updateCard, ValidationSource.BODY, { allowUnknown: true }),
  asyncHandler(CardController.updateCard)
)

export const CardRoute = router
