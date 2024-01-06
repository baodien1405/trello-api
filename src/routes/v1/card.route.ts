import express from 'express'

import { asyncHandler } from '@/helpers'
import { createCardSchema, getCardDetailsSchema } from '@/validations'
import { CardController } from '@/controllers'
import { ValidationSource, validator } from '@/middlewares'

const router = express.Router()

router.post('/', validator(createCardSchema), asyncHandler(CardController.createCard))
router.get('/:id', validator(getCardDetailsSchema, ValidationSource.PARAM), asyncHandler(CardController.getCardDetails))

export const CardRoute = router
