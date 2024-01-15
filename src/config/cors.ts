import { ForbiddenError } from '@/core'
import { env } from './environment'
import { WHITELIST_DOMAINS } from '@/constants'
import { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (env.NODE_ENV === 'development') {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin as string)) {
      return callback(null, true)
    }

    return callback(new ForbiddenError(`${origin} not allowed by our CORS Policy.`))
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS allow receive cookies from request
  credentials: true
}
