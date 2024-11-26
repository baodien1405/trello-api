import { createColumnSchema } from '@/validations/column/create-column.schema'
import { deleteColumnSchema } from '@/validations/column/delete-column.schema'
import { getColumnDetailsSchema } from '@/validations/column/get-column-details.schema'
import { updateColumnSchema } from '@/validations/column/update-column.schema'

export const columnSchema = {
  createColumn: createColumnSchema,
  updateColumn: updateColumnSchema,
  deleteColumn: deleteColumnSchema,
  getColumnDetails: getColumnDetailsSchema
}
