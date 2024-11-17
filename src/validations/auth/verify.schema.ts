import Joi from 'joi'

import { EMAIL_RULE, EMAIL_RULE_MESSAGE } from '@/constants'
import { Verify } from '@/types'

export const verifySchema = Joi.object<Verify>({
  email: Joi.string().email().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE).required(),
  token: Joi.string().required()
})
