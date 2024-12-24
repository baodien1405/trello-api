import Joi from 'joi'

import { BOARD_INVITATION_STATUS, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'
import { UpdateBoardInvitation } from '@/types'

export const updateBoardInvitationSchema = Joi.object<UpdateBoardInvitation>({
  invitationId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
  status: Joi.string()
    .required()
    .valid(...Object.values(BOARD_INVITATION_STATUS))
})
