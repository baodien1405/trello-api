import { Request, Response, NextFunction } from 'express'
import { CREATED, OK } from '@/core'
import { BoardService, ColumnService } from '@/services'
import { ObjectId } from 'mongodb'

const createColumn = async (req: Request, res: Response, next: NextFunction) => {
  new CREATED({
    message: 'Created successfully!',
    metadata: await ColumnService.createColumn(req.body)
  }).send(res)
}

const getColumnDetails = async (req: Request, res: Response, next: NextFunction) => {
  const columnId = new ObjectId(req.params.id)

  new OK({
    message: 'Get column successfully!',
    metadata: await ColumnService.getColumnDetails(columnId)
  }).send(res)
}

export const ColumnController = {
  createColumn,
  getColumnDetails
}
