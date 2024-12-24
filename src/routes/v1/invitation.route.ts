import express from 'express'

import { InvitationController } from '@/controllers'
import { asyncHandler } from '@/helpers'
import { authMiddleware, validator } from '@/middlewares'
import { invitationSchema } from '@/validations'

const router = express.Router()

router.post(
  '/board',
  authMiddleware.authentication,
  validator(invitationSchema.createNewBoardInvitation),
  asyncHandler(InvitationController.createNewBoardInvitation)
)

router.get('/', authMiddleware.authentication, asyncHandler(InvitationController.getInvitationList))

router.put(
  '/board/:id',
  authMiddleware.authentication,
  validator(invitationSchema.updateBoardInvitation),
  asyncHandler(InvitationController.updateBoardInvitation)
)

export const InvitationRoute = router
