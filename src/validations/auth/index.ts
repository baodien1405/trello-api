import { loginSchema } from './login.schema'
import { registerSchema } from './register.schema'

export const authSchema = {
  login: loginSchema,
  register: registerSchema
}
