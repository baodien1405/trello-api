import { Response, Request, NextFunction } from 'express'

export const asyncHandler = (func: (req: Request, res: Response, next: NextFunction) => Promise<any> | any) => {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res, next).catch(next)
  }
}
