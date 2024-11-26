import Joi from 'joi'

import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '@/constants'
import { UpdateUserPayload } from '@/types'

export const updateUserSchema = Joi.object<UpdateUserPayload>({
  displayName: Joi.string().trim().strict(),
  current_password: Joi.string().pattern(PASSWORD_RULE).message(`current_password: ${PASSWORD_RULE_MESSAGE}`),
  new_password: Joi.string().pattern(PASSWORD_RULE).message(`new_password: ${PASSWORD_RULE_MESSAGE}`)
})
