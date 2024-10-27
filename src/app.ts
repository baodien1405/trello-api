import { Application } from 'express'
import { API_ROUTE_V1, API_ROUTE_V2 } from './routes'

export default async (app: Application) => {
  app.use('/v1/api', API_ROUTE_V1)
  app.use('/v2/api', API_ROUTE_V2)

  return app
}
