import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'

import { CREATED, OK, SuccessResponse } from '@/core'
import { BoardService } from '@/services'

const createBoard = async (req: Request, res: Response, next: NextFunction) => {
  new CREATED({
    message: 'Created successfully!',
    metadata: await BoardService.createBoard(req.body)
  }).send(res)
}

const getBoardDetails = async (req: Request, res: Response, next: NextFunction) => {
  const boardId = new ObjectId(req.params.id)
  const userId = new ObjectId(req.user._id)

  new OK({
    message: 'Get board successfully!',
    metadata: await BoardService.getBoardDetails(userId, boardId)
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

const getBoardList = async (req: Request, res: Response, next: NextFunction) => {
  new SuccessResponse({
    message: 'Get boards successfully!',
    metadata: await BoardService.getBoardList({
      ...req.query,
      userId: req.user._id
    })
  }).send(res)
}

export const BoardController = {
  createBoard,
  getBoardDetails,
  updateBoard,
  moveCardToDifferentColumn,
  getBoardList
}
