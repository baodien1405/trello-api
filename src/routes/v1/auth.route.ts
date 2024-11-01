import express from 'express'

import { AuthController } from '@/controllers'
import { authSchema } from '@/validations'
import { asyncHandler } from '@/helpers'
import { validator } from '@/middlewares'

const router = express.Router()

router.post('/users/register', validator(authSchema.register), asyncHandler(AuthController.register))
router.post('/users/login', validator(authSchema.login), asyncHandler(AuthController.login))

export { router as AuthRoute }
