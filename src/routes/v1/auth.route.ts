import express from 'express'

import { AuthController } from '@/controllers'
import { authSchema } from '@/validations'
import { asyncHandler } from '@/helpers'
import { validator } from '@/middlewares'

const router = express.Router()

router.post('/users/register', validator(authSchema.register), asyncHandler(AuthController.register))
router.post('/users/login', validator(authSchema.login), asyncHandler(AuthController.login))
router.put('/users/verify', validator(authSchema.verify), asyncHandler(AuthController.verify))
router.post('/users/logout', asyncHandler(AuthController.logout))
router.get('/users/refreshToken', asyncHandler(AuthController.refreshToken))

export { router as AuthRoute }
