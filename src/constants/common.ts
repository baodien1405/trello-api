import { env } from '@/config'

export const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  REFRESH_TOKEN: 'x-rtoken-id'
} as const

export const WEBSITE_DOMAIN =
  env.NODE_ENV === 'production' ? env.WEBSITE_DOMAIN_PRODUCTION : env.WEBSITE_DOMAIN_DEVELOPMENT
