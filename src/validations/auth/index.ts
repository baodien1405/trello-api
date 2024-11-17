import { loginSchema } from '@/validations/auth/login.schema'
import { registerSchema } from '@/validations/auth/register.schema'
import { verifySchema } from '@/validations/auth/verify.schema'

export const authSchema = {
  login: loginSchema,
  register: registerSchema,
  verify: verifySchema
}
