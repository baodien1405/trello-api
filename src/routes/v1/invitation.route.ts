import express from 'express'

import { InvitationController } from '@/controllers'
import { asyncHandler } from '@/helpers'
import { authMiddleware, ValidationSource, validator } from '@/middlewares'
import { invitationSchema } from '@/validations'
import { extractField } from '@/utils'

const router = express.Router()

router.post(
  '/board',
  authMiddleware.authentication,
  validator(invitationSchema.createNewBoardInvitation),
  asyncHandler(InvitationController.createNewBoardInvitation)
)

router.get('/', authMiddleware.authentication, asyncHandler(InvitationController.getInvitationList))

router.put(
  '/board/:invitationId',
  authMiddleware.authentication,
  validator(extractField(invitationSchema.updateBoardInvitation, 'invitationId'), ValidationSource.PARAM),
  validator(extractField(invitationSchema.updateBoardInvitation, 'status')),
  asyncHandler(InvitationController.updateBoardInvitation)
)

export const InvitationRoute = router
