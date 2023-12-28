import { Request, Response, NextFunction } from 'express'
import { CREATED } from '@/core'
import { BoardService } from '@/services'

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
  new CREATED({
    message: 'Get list category success!',
    metadata: await BoardService.createBoard(req.body)
  }).send(res)
}

export const BoardController = {
  createBoard
}
