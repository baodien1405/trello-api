import { Request, Response, NextFunction } from 'express'
import { CREATED, OK, SuccessResponse } from '@/core'
import { ColumnService } from '@/services'
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

const updateColumn = async (req: Request, res: Response, next: NextFunction) => {
  const columnId = new ObjectId(req.params.id)

  new SuccessResponse({
    message: 'Update column success!',
    metadata: await ColumnService.updateColumn(columnId, req.body)
  }).send(res)
}

const deleteColumn = async (req: Request, res: Response, next: NextFunction) => {
  const columnId = new ObjectId(req.params.id)

  new SuccessResponse({
    message: 'Delete column success!',
    metadata: await ColumnService.deleteColumn(columnId)
  }).send(res)
}

export const ColumnController = {
  createColumn,
  getColumnDetails,
  updateColumn,
  deleteColumn
}
