import cloneDeep from 'lodash/cloneDeep'
import { ObjectId } from 'mongodb'
import { NotFoundError } from '@/core'
import { ColumnModel } from '@/models'
import { Column } from '@/types'

const createColumn = async (payload: Column) => {
  const createdColumn = await ColumnModel.createColumn(payload)
  const column = await ColumnModel.findOneById(createdColumn.insertedId)

  return column
}

const getColumnDetails = async (columnId: ObjectId) => {
  const column = await ColumnModel.findOneById(columnId)

  if (!column) throw new NotFoundError('Column not found!')

  const newColumn = cloneDeep(column)

  return newColumn
}

export const ColumnService = {
  createColumn,
  getColumnDetails
}
