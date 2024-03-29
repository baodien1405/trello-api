import cloneDeep from 'lodash/cloneDeep'
import { ObjectId } from 'mongodb'
import { BadRequestError, NotFoundError } from '@/core'
import { BoardModel, CardModel, ColumnModel } from '@/models'
import { Column } from '@/types'

const createColumn = async (payload: Column) => {
  const createdColumn = await ColumnModel.createColumn(payload)
  const column = await ColumnModel.findOneById(createdColumn.insertedId)

  if (column) {
    column.cards = []
    await BoardModel.pushColumnOrderIds(column)
  }

  return column
}

const getColumnDetails = async (columnId: ObjectId) => {
  const column = await ColumnModel.findOneById(columnId)

  if (!column) throw new NotFoundError('Column not found!')

  const newColumn = cloneDeep(column)

  return newColumn
}

const updateColumn = async (columnId: ObjectId, payload: Partial<Column>) => {
  const updateData = {
    ...payload,
    updatedAt: Date.now()
  }

  const updatedColumn = await ColumnModel.updateColumn(columnId, updateData)

  if (!updatedColumn) throw new BadRequestError('Failed to update column!')

  return updatedColumn
}

const deleteColumn = async (columnId: ObjectId) => {
  const existColumn = await ColumnModel.findOneById(columnId)

  if (!existColumn) throw new NotFoundError('Column not found!')

  await ColumnModel.deleteOneById(columnId)

  await CardModel.deleteManyByColumnId(columnId)

  await BoardModel.pullColumnOrderIds(existColumn)

  return { deleteResult: 'Column and its cards deleted successfully' }
}

export const ColumnService = {
  createColumn,
  getColumnDetails,
  updateColumn,
  deleteColumn
}
