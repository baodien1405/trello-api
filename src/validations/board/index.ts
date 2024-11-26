import { createBoardSchema } from '@/validations/board/create-board.schema'
import { getBoardDetailsSchema } from '@/validations/board/get-board-details.schema'
import { moveCardToDifferentColumnSchema } from '@/validations/board/move-card-to-different-column.schema'
import { updateBoardSchema } from '@/validations/board/update-board.schema'

export const boardSchema = {
  createBoard: createBoardSchema,
  getBoardDetails: getBoardDetailsSchema,
  moveCardToDifferentColumn: moveCardToDifferentColumnSchema,
  updateBoard: updateBoardSchema
}
