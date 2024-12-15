import Joi from 'joi'

import { EMAIL_RULE, EMAIL_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '@/constants'
import { InvitationPayload } from '@/types'

export const createNewBoardInvitationSchema = Joi.object<InvitationPayload>({
  inviteeEmail: Joi.string().email().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE).required(),
  boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required()
})
