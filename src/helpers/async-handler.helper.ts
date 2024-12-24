import { Response, Request, NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/ban-types
export const asyncHandler = (func: Function) => {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res, next).catch(next)
  }
}
