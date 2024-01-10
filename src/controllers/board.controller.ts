import { Request, Response, NextFunction } from 'express'
import { CREATED, OK, SuccessResponse } from '@/core'
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

const updateBoard = async (req: Request, res: Response, next: NextFunction) => {
  const boardId = new ObjectId(req.params.id)

  new SuccessResponse({
    message: 'Update board success!',
    metadata: await BoardService.updateBoard(boardId, req.body)
  }).send(res)
}

const moveCardToDifferentColumn = async (req: Request, res: Response, next: NextFunction) => {
  new SuccessResponse({
    message: 'Success!',
    metadata: await BoardService.moveCardToDifferentColumn(req.body)
  }).send(res)
}

export const BoardController = {
  createBoard,
  getBoardDetails,
  updateBoard,
  moveCardToDifferentColumn
}
