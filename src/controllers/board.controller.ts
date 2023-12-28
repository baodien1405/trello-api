import { Request, Response, NextFunction } from 'express'
import { CREATED } from '@/core'

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
  new CREATED({
    message: 'Get list category success!',
    metadata: []
  }).send(res)
}

export const BoardController = {
  createBoard
}
