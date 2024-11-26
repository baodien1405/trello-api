import express from 'express'

import { UserController } from '@/controllers'
import { asyncHandler } from '@/helpers'
import { authMiddleware, validator } from '@/middlewares'
import { userSchema } from '@/validations'

const router = express.Router()

router.put(
  '/',
  validator(userSchema.updateUser),
  authMiddleware.authentication,
  asyncHandler(UserController.updateUser)
)

export const UserRoute = router
