import { CategoryRoute, ProductRoute } from '@/routes'
import { Application } from 'express'
import { Request, Response, NextFunction } from 'express'

export default async (app: Application) => {
  // app.use('/v1/api/products', ProductRoute)
  // app.use('/v1/api/categories', CategoryRoute)

  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello world!')
  })

  return app
}
