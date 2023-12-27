import { Application } from 'express'
import { APIs_ROUTE_V1, APIs_ROUTE_V2 } from './routes'

export default async (app: Application) => {
  app.use('/v1/api', APIs_ROUTE_V1)
  app.use('/v2/api', APIs_ROUTE_V2)

  return app
}
