import { Request, Response, NextFunction } from 'express'
import { CREATED, OK } from '@/core'
import { BoardService } from '@/services'
import { ObjectId } from 'mongodb'

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
  new CREATED({
    message: 'Created successfully!',
    metadata: await BoardService.createBoard(req.body)
  }).send(res)
}

const getBoardDetails = async (req: Request, res: Response, next: NextFunction) => {
  const boardId = new ObjectId(req.params.id)

  new OK({
    message: 'Get board successfully!',
    metadata: await BoardService.getBoardDetails(boardId)
  }).send(res)
}

export const BoardController = {
  createBoard,
  getBoardDetails
}
