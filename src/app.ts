import { Application } from 'express'
import { API_ROUTE_V1, API_ROUTE_V2 } from './routes'
import { HealthController } from '@/controllers'
import { asyncHandler } from '@/helpers'

export default async (app: Application) => {
  app.get('/health', asyncHandler(HealthController.check))
  app.use('/v1/api', API_ROUTE_V1)
  app.use('/v2/api', API_ROUTE_V2)

  return app
}

