import 'dotenv/config'

export const env = {
  MONGODB_URI: process.env.MONGODB_URI || '',
  DATABASE_NAME: process.env.DATABASE_NAME,
  PORT: process.env.PORT || 8017,
  NODE_ENV: process.env.NODE_ENV
}
