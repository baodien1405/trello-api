import Joi from 'joi'

import { Login } from '@/types'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '@/constants'

export const loginSchema = Joi.object<Login>({
  email: Joi.string().email().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE).required(),
  password: Joi.string().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE).required()
})
