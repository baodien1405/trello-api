import express from 'express'

import { UserController } from '@/controllers'
import { asyncHandler } from '@/helpers'
import { authMiddleware, multerUploadMiddleware, validator } from '@/middlewares'
import { userSchema } from '@/validations'

const router = express.Router()

router.put(
  '/',
  authMiddleware.authentication,
  multerUploadMiddleware.upload.single('avatar'),
  validator(userSchema.updateUser),
  asyncHandler(UserController.updateUser)
)

export const UserRoute = router
